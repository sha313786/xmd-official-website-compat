import { createClient } from "@/lib/supabase/client";

export interface ActiveDutyMember {
  id: string;
  member_id: string;
  badge_number: string | null;
  full_name: string;
  rank: string | null;
  duty_start: string;
}

export interface DashboardDutyStats {
  activeDuty: number;
  activeMembersToday: number;
  todayDutyHours: number;
  promotionCycleHours: number;
}

export class DashboardDutyService {
  /**
   * Members currently on duty
   */
  static async getActiveDutyMembers(): Promise<ActiveDutyMember[]> {
    const supabase = createClient();
    const { data: dutyLogs, error } = await supabase
      .from("duty_logs")
      .select("id, member_id, duty_start")
      .is("duty_end", null)
      .order("duty_start", { ascending: false });

    if (error) {
      throw error;
    }

    const members = await Promise.all(
      (dutyLogs ?? []).map(async (log: any) => {
        const { data: member, error: memberError } = await supabase
          .from("members")
          .select("badge_number, full_name, rank")
          .eq("id", log.member_id)
          .single();

        if (memberError) {
          console.error(
            `Failed to load member ${log.member_id}`,
            memberError
          );
        }

        return {
          id: log.id,
          member_id: log.member_id,
          badge_number: member?.badge_number ?? null,
          full_name: member?.full_name ?? "Unknown",
          rank: member?.rank ?? null,
          duty_start: log.duty_start,
        };
      })
    );

    return members;
  }

  /**
 * Dashboard statistics
 */
static async getDashboardStats(): Promise<DashboardDutyStats> {
  const supabase = createClient();
  const now = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Active Duty
  const { count: activeDuty, error: activeError } = await supabase
    .from("duty_logs")
    .select("*", { count: "exact", head: true })
    .is("duty_end", null);

  if (activeError) throw activeError;

  // Today's logs
  const { data: todayLogs, error: todayError } = await supabase
    .from("duty_logs")
    .select(
      "member_id, duty_start, duty_end, duty_hours"
    )
    .gte("duty_start", today.toISOString())
    .lt("duty_start", tomorrow.toISOString());

  if (todayError) throw todayError;

  // Unique members today
  const activeMembersToday = new Set(
    (todayLogs ?? []).map((log: any) => log.member_id)
  ).size;

  // Today's duty hours (completed + active sessions)
  let todayDutyHours = 0;

  for (const log of todayLogs ?? []) {
    if (log.duty_end) {
      todayDutyHours += Number(log.duty_hours ?? 0);
    } else {
      const start = new Date(log.duty_start).getTime();
      todayDutyHours +=
        (now.getTime() - start) / 3600000;
    }
  }

  // Active Promotion Cycle
  const { data: cycle } = await supabase
    .from("promotion_cycles")
    .select("start_date,end_date")
    .lte("start_date", today.toISOString().split("T")[0])
    .gte("end_date", today.toISOString().split("T")[0])
    .single();

  let promotionCycleHours = 0;

  if (cycle) {
    const cycleStart =
      cycle.start_date + "T00:00:00";

    const cycleEnd =
      cycle.end_date + "T23:59:59";

    const { data: cycleLogs } = await supabase
      .from("duty_logs")
      .select(
        "duty_start,duty_end,duty_hours"
      )
      .gte("duty_start", cycleStart)
      .lte("duty_start", cycleEnd);

    for (const log of cycleLogs ?? []) {
      if (log.duty_end) {
        promotionCycleHours += Number(
          log.duty_hours ?? 0
        );
      } else {
        const start = new Date(
          log.duty_start
        ).getTime();

        promotionCycleHours +=
          (now.getTime() - start) / 3600000;
      }
    }
  }

  return {
    activeDuty: activeDuty ?? 0,
    activeMembersToday,
    todayDutyHours: Number(
      todayDutyHours.toFixed(2)
    ),
    promotionCycleHours: Number(
      promotionCycleHours.toFixed(2)
    ),
  };
  }
}
export const dashboardDutyService = DashboardDutyService;