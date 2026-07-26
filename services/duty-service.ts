import { createClient } from "@/lib/supabase/client";

export interface MemberDutyStats {
  dutyHours: number;
  dutyDays: number;

  progress: number;

  remainingHours: number;
  remainingDays: number;

  lastDuty: string | null;

  isOnDuty: boolean;
  dutyStart: string | null;

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
      dutyStart: null,

      cycleId: "",
      cycleName: "",

      eligible: false,
    };

    // Active Promotion Cycle
    const { data: cycle, error: cycleError } =
      await supabase
        .from("promotion_cycles")
        .select(`
          id,
          name,
          required_hours,
          required_days
        `)
        .eq("is_active", true)
        .single();

    if (cycleError || !cycle) {
      console.error(cycleError);
      return emptyResult;
    }

    // Member duty logs for current cycle
    const { data: dutyLogs, error: dutyLogsError } =
      await supabase
        .from("duty_logs")
        .select(`
          duty_hours,
          normalized_duty_date
        `)
        .eq("member_id", memberId)
        .eq("cycle_id", cycle.id);

    if (dutyLogsError) {
      console.error(dutyLogsError);
      return emptyResult;
    }

    const dutyHours = (dutyLogs ?? []).reduce(
      (total, log) =>
        total + Number(log.duty_hours ?? 0),
      0
    );

    const dutyDays = new Set(
      (dutyLogs ?? []).map(
        (log) => log.normalized_duty_date
      )
    ).size;

    const requiredHours = Number(
      cycle.required_hours ?? 25
    );

    const requiredDays = Number(
      cycle.required_days ?? 20
    );
        // Last completed duty
    const { data: lastDutyLog } =
      await supabase
        .from("duty_logs")
        .select("created_at")
        .eq("member_id", memberId)
        .not("duty_end", "is", null)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

    // Active duty
    const { data: activeDuty } =
      await supabase
        .from("duty_logs")
        .select("id, duty_start")
        .eq("member_id", memberId)
        .is("duty_end", null)
        .maybeSingle();

    const progress =
      requiredHours > 0
        ? Math.min(
            Math.round(
              (dutyHours / requiredHours) * 100
            ),
            100
          )
        : 0;

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

      dutyStart:
        activeDuty?.duty_start ?? null,

      cycleId: cycle.id,

      cycleName: cycle.name,

      eligible:
        dutyHours >= requiredHours &&
        dutyDays >= requiredDays,
    };
  }
}

export const dutyService = DutyService;