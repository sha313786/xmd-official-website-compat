import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface MemberDutyStats {
  dutyHours: number;
  dutyDays: number;
  progress: number;
}

export class DutyService {
  static async getMemberDutyStats(
    memberId: string
  ): Promise<MemberDutyStats> {
    // Get active promotion cycle
    const { data: cycle, error: cycleError } = await supabase
      .from("promotion_cycles")
      .select("id")
      .eq("is_active", true)
      .single();

    if (cycleError || !cycle) {
      return {
        dutyHours: 0,
        dutyDays: 0,
        progress: 0,
      };
    }

    // Read already calculated promotion result
    const { data: result, error } = await supabase
      .from("promotion_results")
      .select("total_hours,duty_days")
      .eq("cycle_id", cycle.id)
      .eq("member_id", memberId)
      .single();

    if (error || !result) {
      return {
        dutyHours: 0,
        dutyDays: 0,
        progress: 0,
      };
    }

    const dutyHours = Number(result.total_hours ?? 0);
    const dutyDays = Number(result.duty_days ?? 0);

    return {
      dutyHours,
      dutyDays,
      progress: Math.min(
        Math.round((dutyHours / 25) * 100),
        100
      ),
    };
  }
}

export const dutyService = DutyService;