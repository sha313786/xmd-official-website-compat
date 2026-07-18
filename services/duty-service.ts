import { createClient } from "@/lib/supabase/client";

export interface MemberDutyStats {
  dutyHours: number;
  dutyDays: number;

  progress: number;

  remainingHours: number;
  remainingDays: number;

  lastDuty: string | null;

  isOnDuty: boolean;

  cycleId: string;
  cycleName: string;

  eligible: boolean;
}

export class DutyService {
  static async getMemberDutyStats(
    memberId: string
  ): Promise<MemberDutyStats> {
    const supabase = createClient();

    const emptyResult: MemberDutyStats = {
      dutyHours: 0,
      dutyDays: 0,

      progress: 0,

      remainingHours: 0,
      remainingDays: 0,

      lastDuty: null,

      isOnDuty: false,

      cycleId: "",
      cycleName: "",

      eligible: false,
    };

    // Active promotion cycle
    const { data: cycle, error: cycleError } =
      await supabase
        .from("promotion_cycles")
        .select(
          `
          id,
          name,
          required_hours,
          required_days
        `
        )
        .eq("is_active", true)
        .single();

    if (cycleError || !cycle) {
      return emptyResult;
    }

    // Promotion result
    const { data: result } = await supabase
      .from("promotion_results")
      .select(
        `
        total_hours,
        duty_days
      `
      )
      .eq("cycle_id", cycle.id)
      .eq("member_id", memberId)
      .single();

    const dutyHours = Number(
      result?.total_hours ?? 0
    );

    const dutyDays = Number(
      result?.duty_days ?? 0
    );

    const requiredHours = Number(
      cycle.required_hours ?? 25
    );

    const requiredDays = Number(
      cycle.required_days ?? 20
    );

    // Last duty
    const { data: lastDutyLog } =
      await supabase
        .from("duty_logs")
        .select("created_at")
        .eq("member_id", memberId)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

    // Live duty status
    const { data: activeDuty } =
      await supabase
        .from("live_duty")
        .select("id")
        .eq("member_id", memberId)
        .maybeSingle();

    const progress = Math.min(
      Math.round(
        (dutyHours / requiredHours) * 100
      ),
      100
    );

    return {
      dutyHours,

      dutyDays,

      progress,

      remainingHours: Math.max(
        requiredHours - dutyHours,
        0
      ),

      remainingDays: Math.max(
        requiredDays - dutyDays,
        0
      ),

      lastDuty:
        lastDutyLog?.created_at ?? null,

      isOnDuty: !!activeDuty,

      cycleId: cycle.id,

      cycleName: cycle.name,

      eligible:
        dutyHours >= requiredHours &&
        dutyDays >= requiredDays,
    };
  }
}

export const dutyService = DutyService;