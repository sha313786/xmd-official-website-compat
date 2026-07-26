import { createClient } from "@/lib/supabase/client";

type DutyLogRow = {
  id: string;
  member_id: string;
  duty_start: string;
  duty_end: string | null;
  duty_hours: number | null;
};

type MemberRow = {
  badge_number: string | null;
  full_name: string;
  rank: string | null;
};

type PromotionCycleRow = {
  start_date: string;
  end_date: string;
};

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
  static async getActiveDutyMembers(): Promise<ActiveDutyMember[]> {
    const supabase = createClient();

    const { data: dutyLogs, error } = await supabase
      .from("duty_logs")
      .select("id, member_id, duty_start")
      .is("duty_end", null)
      .order("duty_start", { ascending: false });

    if (error) throw error;

    const members = await Promise.all(
      ((dutyLogs ?? []) as DutyLogRow[]).map(async (log) => {
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

        const memberData = member as MemberRow | null;

        return {
          id: log.id,
          member_id: log.member_id,
          badge_number: memberData?.badge_number ?? null,
          full_name: memberData?.full_name ?? "Unknown",
          rank: memberData?.rank ?? null,
          duty_start: log.duty_start,
        };
      })
    );

    return members;
  }

  static async getDashboardStats(): Promise<DashboardDutyStats> {
    const supabase = createClient();
    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { count: activeDuty, error: activeError } = await supabase
      .from("duty_logs")
      .select("*", { count: "exact", head: true })
      .is("duty_end", null);

    if (activeError) throw activeError;

    const { data: todayLogs, error: todayError } = await supabase
      .from("duty_logs")
      .select("member_id, duty_start, duty_end, duty_hours")
      .gte("duty_start", today.toISOString())
      .lt("duty_start", tomorrow.toISOString());

    if (todayError) throw todayError;

    const typedTodayLogs = (todayLogs ?? []) as DutyLogRow[];

    const activeMembersToday = new Set(
      typedTodayLogs.map((log) => log.member_id)
    ).size;

    let todayDutyHours = 0;

    for (const log of typedTodayLogs) {
      if (log.duty_end) {
        todayDutyHours += Number(log.duty_hours ?? 0);
      } else {
        const start = new Date(log.duty_start).getTime();
        todayDutyHours +=
          (now.getTime() - start) / 3600000;
      }
    }

    const { data: cycle } = await supabase
      .from("promotion_cycles")
      .select("start_date,end_date")
      .lte("start_date", today.toISOString().split("T")[0])
      .gte("end_date", today.toISOString().split("T")[0])
      .single();

    let promotionCycleHours = 0;

    const cycleData = cycle as PromotionCycleRow | null;

    if (cycleData) {
      const cycleStart = `${cycleData.start_date}T00:00:00`;
      const cycleEnd = `${cycleData.end_date}T23:59:59`;

      const { data: cycleLogs } = await supabase
        .from("duty_logs")
        .select("duty_start,duty_end,duty_hours")
        .gte("duty_start", cycleStart)
        .lte("duty_start", cycleEnd);

      const typedCycleLogs = (cycleLogs ?? []) as DutyLogRow[];

      for (const log of typedCycleLogs) {
        if (log.duty_end) {
          promotionCycleHours += Number(log.duty_hours ?? 0);
        } else {
          const start = new Date(log.duty_start).getTime();
          promotionCycleHours +=
            (now.getTime() - start) / 3600000;
        }
      }
    }

    return {
      activeDuty: activeDuty ?? 0,
      activeMembersToday,
      todayDutyHours: Number(todayDutyHours.toFixed(2)),
      promotionCycleHours: Number(
        promotionCycleHours.toFixed(2)
      ),
    };
  }
}

export const dashboardDutyService = DashboardDutyService;