import { supabase } from "../config/supabase";
import { PromotionCycleService } from "./promotion-cycle.service";
import { MemberService } from "./member.service";

export class DutyService {
  static async startDuty(discordId: string) {
    const member = await MemberService.getByDiscordId(discordId);

    if (!member) {
      throw new Error("Member not found.");
    }

    const memberId = member.id;

    const cycle = await PromotionCycleService.getActiveCycle();

    if (!cycle) {
      throw new Error("No active promotion cycle found.");
    }

    const { data: activeSessions, error: activeError } = await supabase
      .from("duty_logs")
      .select("id")
      .eq("member_id", memberId)
      .is("duty_end", null)
      .limit(1);

    if (activeError) {
      throw activeError;
    }

    if (activeSessions && activeSessions.length > 0) {
      throw new Error("You are already On Duty.");
    }

    const { data, error } = await supabase
      .from("duty_logs")
      .insert({
        cycle_id: cycle.id,
        member_id: memberId,
        duty_start: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  static async endDuty(discordId: string) {
    const member = await MemberService.getByDiscordId(discordId);

    if (!member) {
      throw new Error("Member not found.");
    }

    const memberId = member.id;

    const { data: sessions, error } = await supabase
      .from("duty_logs")
      .select("*")
      .eq("member_id", memberId)
      .is("duty_end", null)
      .order("duty_start", { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    const session = sessions?.[0];

    if (!session) {
      throw new Error("You are not currently On Duty.");
    }

    const dutyEnd = new Date();
    const dutyEndIso = dutyEnd.toISOString();

    const dutyStart = new Date(session.duty_start);

    const dutyHours =
      (dutyEnd.getTime() - dutyStart.getTime()) /
      (1000 * 60 * 60);

    const normalizedDate = new Date(dutyStart);

    if (normalizedDate.getHours() < 2) {
      normalizedDate.setDate(
        normalizedDate.getDate() - 1
      );
    }

    const normalizedDutyDate = normalizedDate
      .toISOString()
      .split("T")[0];

    const { data: updatedSession, error: updateError } =
      await supabase
        .from("duty_logs")
        .update({
          duty_end: dutyEndIso,
          duty_hours: Number(dutyHours.toFixed(2)),
          normalized_duty_date: normalizedDutyDate,
          updated_at: dutyEndIso,
        })
        .eq("id", session.id)
        .select()
        .single();

    if (updateError) {
      throw updateError;
    }

    return updatedSession;
  }
}

export const dutyService = DutyService;