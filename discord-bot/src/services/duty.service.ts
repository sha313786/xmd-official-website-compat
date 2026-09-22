import { supabase } from "../config/supabase";
import { MemberService } from "./member.service";
import { PromotionCycleService } from "./promotion-cycle.service";

export class DutyService {
  /**
   * Get member by Discord ID.
   */
  static async getMember(discordId: string) {
    const member = await MemberService.getByDiscordId(discordId);

    if (!member) {
      throw new Error("Member not found.");
    }

    return member;
  }

  /**
   * Get the active promotion cycle.
   */
  static async getActiveCycle() {
    const cycle = await PromotionCycleService.getActiveCycle();

    if (!cycle) {
      throw new Error("No active promotion cycle found.");
    }

    return cycle;
  }

  /**
   * Get the latest active duty session.
   */
  static async getActiveSession(memberId: string) {
    const { data, error } = await supabase
      .from("duty_logs")
      .select("*")
      .eq("member_id", memberId)
      .is("duty_end", null)
      .order("duty_start", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Calculate total duty hours.
   */
  static calculateDutyHours(start: Date, end: Date): number {
    const hours =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60);

    return Number(hours.toFixed(2));
  }

  /**
   * Normalize duty date.
   *
   * Rule:
   * 00:00–01:59 → Previous day
   * 02:00+      → Same day
   */
  static normalizeDutyDate(date: Date): string {
    const normalized = new Date(date);

    if (normalized.getHours() < 2) {
      normalized.setDate(normalized.getDate() - 1);
    }

    return normalized.toISOString().split("T")[0];
  }

  /**
   * Start a duty session.
   */
  static async startDuty(discordId: string) {
    const member = await this.getMember(discordId);

    const cycle = await this.getActiveCycle();

    const activeSession = await this.getActiveSession(member.id);

    if (activeSession) {
      throw new Error("You are already On Duty.");
    }

    const { data, error } = await supabase
      .from("duty_logs")
      .insert({
        cycle_id: cycle.id,
        member_id: member.id,
        duty_start: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * End the caller's active duty session.
   */
  static async endDuty(discordId: string) {
    const member = await this.getMember(discordId);

    return this.endDutyForMember(member.id);
  }

  /**
   * Force-end an active duty session for a specific member.
   *
   * This only closes the currently open duty_logs row.
   * Existing promotion and duty calculation rules are unchanged.
   */
  static async endDutyForMember(memberId: string) {
    const session = await this.getActiveSession(memberId);

    if (!session) {
      throw new Error("This member is not currently On Duty.");
    }

    const dutyEnd = new Date();
    const dutyStart = new Date(session.duty_start);

    const dutyHours = this.calculateDutyHours(
      dutyStart,
      dutyEnd
    );

    const normalizedDutyDate =
      this.normalizeDutyDate(dutyStart);

    const { data, error } = await supabase
      .from("duty_logs")
      .update({
        duty_end: dutyEnd.toISOString(),
        duty_hours: dutyHours,
        normalized_duty_date: normalizedDutyDate,
        updated_at: dutyEnd.toISOString(),
      })
      .eq("id", session.id)
      .is("duty_end", null)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}

export const dutyService = DutyService;
