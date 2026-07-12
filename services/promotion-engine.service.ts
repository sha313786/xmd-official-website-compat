import { DutyLog, PromotionResult } from "@/types";

const RANKS = [
  "Community Care",
  "Trainee",
  "Paramedic",
  "Nurse",
  "Head Nurse",
  "Consultant",
  "Senior Consultant",
  "Junior Doctor",
  "Doctor",
  "Senior Doctor",
  "Assistant Surgeon",
  "Surgeon",
  "Senior Surgeon",
  "Senior Specialist",
  "Medical Officer",
  "Operational Specialist",
  "Medical Supervisor",
  "Clinical Operations Head",
  "Assistant Chief",
  "Chief",
  "Director",
] as const;

const MANAGEMENT_RANKS = [
  "Assistant Chief",
  "Chief",
  "Director",
] as const;

const MAX_DOUBLE_PROMOTION_RANK = "Senior Consultant";

export class PromotionEngine {
  static normalizeDutyDate(log: DutyLog): string {
    const start = new Date(log.duty_start);

    const hours = start.getHours();

    if (hours < 2) {
      const previous = new Date(start);

      previous.setDate(previous.getDate() - 1);

      return previous.toISOString().split("T")[0];
    }

    return log.normalized_duty_date;
  }

  static removeDuplicateLogs(logs: DutyLog[]) {
    const unique = new Map<string, DutyLog>();

    logs.forEach((log) => {
      const key = [
        log.member_id,
        this.normalizeDutyDate(log),
        log.duty_start,
        log.duty_end,
        log.duty_hours,
      ].join("|");

      if (!unique.has(key)) {
        unique.set(key, log);
      }
    });

    return [...unique.values()];
  }

  static calculateHours(logs: DutyLog[]) {
    return logs.reduce(
      (total, log) => total + Number(log.duty_hours),
      0
    );
  }

  static calculateDutyDays(logs: DutyLog[]) {
    const dates = new Set(
      logs.map((log) => this.normalizeDutyDate(log))
    );

    return dates.size;
  }

  static isManagement(rank: string) {
    return MANAGEMENT_RANKS.includes(
      rank as (typeof MANAGEMENT_RANKS)[number]
    );
  }

  static rankIndex(rank: string) {
    return RANKS.indexOf(rank as (typeof RANKS)[number]);
  }

  static nextRank(
    currentRank: string,
    promotionType: "NONE" | "SINGLE" | "DOUBLE"
  ): string | null {
    const currentIndex = this.rankIndex(currentRank);

    if (currentIndex === -1) return null;

    let nextIndex = currentIndex;

    switch (promotionType) {
      case "SINGLE":
        nextIndex += 1;
        break;

      case "DOUBLE":
        nextIndex += 2;
        break;

      default:
        nextIndex = currentIndex;
    }

    if (nextIndex >= RANKS.length) {
      nextIndex = RANKS.length - 1;
    }

    return RANKS[nextIndex];
  }

  static canReceiveDoublePromotion(rank: string) {
    return (
      this.rankIndex(rank) <=
      this.rankIndex(MAX_DOUBLE_PROMOTION_RANK)
    );
  }

  static determinePromotionType(
    rank: string,
    totalHours: number,
    leaderboardPosition: number
  ): PromotionResult["promotion_type"] {
    if (this.isManagement(rank)) {
      return "MANAGEMENT_REWARD";
    }

    if (totalHours < 25) {
      return "NONE";
    }

    if (
      leaderboardPosition <= 3 &&
      this.canReceiveDoublePromotion(rank)
    ) {
      return "DOUBLE";
    }

    return "SINGLE";
  }

  static isEligible(
    rank: string,
    totalHours: number
  ) {
    if (this.isManagement(rank)) {
      return false;
    }

    return totalHours >= 25;
  }

  static createResult(
    data: {
      cycle_id: string;
      member_id: string;
      current_rank: string;
      total_hours: number;
      duty_days: number;
      leaderboard_position: number;
    }
  ): Omit<
    PromotionResult,
    "id" | "created_at" | "updated_at"
  > {
    const promotionType =
      this.determinePromotionType(
        data.current_rank,
        data.total_hours,
        data.leaderboard_position
      );

    const newRank =
      promotionType === "MANAGEMENT_REWARD"
        ? data.current_rank
        : this.nextRank(
            data.current_rank,
            promotionType === "DOUBLE"
              ? "DOUBLE"
              : promotionType === "SINGLE"
              ? "SINGLE"
              : "NONE"
          );

    return {
      cycle_id: data.cycle_id,
      member_id: data.member_id,

      current_rank: data.current_rank,
      new_rank: newRank,

      total_hours: data.total_hours,
      duty_days: data.duty_days,

      promotion_type: promotionType,

      eligible: this.isEligible(
        data.current_rank,
        data.total_hours
      ),

      position: data.leaderboard_position,

      remarks: null,
    };
  }
    static groupLogsByMember(logs: DutyLog[]) {
    const grouped = new Map<string, DutyLog[]>();

    for (const log of logs) {
      const memberLogs = grouped.get(log.member_id);

      if (memberLogs) {
        memberLogs.push(log);
      } else {
        grouped.set(log.member_id, [log]);
      }
    }

    return grouped;
  }

  static calculateMemberStats(logs: DutyLog[]) {
    const uniqueLogs = this.removeDuplicateLogs(logs);

    return {
      totalHours: this.calculateHours(uniqueLogs),
      dutyDays: this.calculateDutyDays(uniqueLogs),
      logs: uniqueLogs,
    };
  }

  static buildLeaderboard(
    logs: DutyLog[],
    memberRanks: Record<string, string>,
    cycleId: string
  ) {
    const grouped = this.groupLogsByMember(logs);

    const leaderboard = [...grouped.entries()].map(
      ([memberId, memberLogs]) => {
        const stats =
          this.calculateMemberStats(memberLogs);

        return {
          member_id: memberId,
          current_rank:
            memberRanks[memberId] ?? "Community Care",
          total_hours: stats.totalHours,
          duty_days: stats.dutyDays,
        };
      }
    );

    leaderboard.sort((a, b) => {
      if (b.total_hours !== a.total_hours) {
        return b.total_hours - a.total_hours;
      }

      return b.duty_days - a.duty_days;
    });

    return leaderboard.map((member, index) =>
      this.createResult({
        cycle_id: cycleId,
        member_id: member.member_id,
        current_rank: member.current_rank,
        total_hours: member.total_hours,
        duty_days: member.duty_days,
        leaderboard_position: index + 1,
      })
    );
  }
    static validateDutyLog(log: DutyLog): boolean {
    if (!log.member_id) return false;
    if (!log.cycle_id) return false;

    if (!log.duty_start) return false;
    if (!log.duty_end) return false;

    if (Number(log.duty_hours) < 0) return false;

    return true;
  }

  static filterValidLogs(logs: DutyLog[]) {
    return logs.filter((log) => this.validateDutyLog(log));
  }

  static processCycle(
    cycleId: string,
    logs: DutyLog[],
    memberRanks: Record<string, string>
  ) {
    const validLogs = this.filterValidLogs(logs);

    return this.buildLeaderboard(
      validLogs,
      memberRanks,
      cycleId
    );
  }

  static getTopPerformers(
    results: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >[],
    count = 3
  ) {
    return [...results]
      .sort((a, b) => {
        if (b.total_hours !== a.total_hours) {
          return b.total_hours - a.total_hours;
        }

        return b.duty_days - a.duty_days;
      })
      .slice(0, count);
  }

  static getEligibleMembers(
    results: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >[]
  ) {
    return results.filter(
      (result) => result.eligible
    );
  }

  static getManagementRewards(
    results: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >[]
  ) {
    return results.filter(
      (result) =>
        result.promotion_type ===
        "MANAGEMENT_REWARD"
    );
  }
    static getSummary(
    results: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >[]
  ) {
    const totalMembers = results.length;

    const eligibleMembers = results.filter(
      (result) => result.eligible
    ).length;

    const singlePromotions = results.filter(
      (result) => result.promotion_type === "SINGLE"
    ).length;

    const doublePromotions = results.filter(
      (result) => result.promotion_type === "DOUBLE"
    ).length;

    const managementRewards = results.filter(
      (result) =>
        result.promotion_type === "MANAGEMENT_REWARD"
    ).length;

    const totalDutyHours = results.reduce(
      (total, result) => total + result.total_hours,
      0
    );

    const totalDutyDays = results.reduce(
      (total, result) => total + result.duty_days,
      0
    );

    return {
      totalMembers,
      eligibleMembers,
      singlePromotions,
      doublePromotions,
      managementRewards,
      totalDutyHours,
      totalDutyDays,
    };
  }

  static getMemberResult(
    results: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >[],
    memberId: string
  ) {
    return (
      results.find(
        (result) => result.member_id === memberId
      ) ?? null
    );
  }

  static sortResults(
    results: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >[]
  ) {
    return [...results].sort((a, b) => {
      if (b.total_hours !== a.total_hours) {
        return b.total_hours - a.total_hours;
      }

      if (b.duty_days !== a.duty_days) {
        return b.duty_days - a.duty_days;
      }

      return (a.position ?? 9999) - (b.position ?? 9999);
    });
  }
}