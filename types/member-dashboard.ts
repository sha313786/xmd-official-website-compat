export interface MemberProfile {
  id: string;
  memberId: string;
  discordId: string;

  name: string;
  callsign: string;

  rank: string;
  department: string;

  avatarUrl: string | null;

  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";

  joinedAt: string;
}

export type MemberPromotionType =
  | "NONE"
  | "SINGLE"
  | "DOUBLE"
  | "MANAGEMENT_REWARD";

export interface MemberStatistics {
  totalDutyHours: number;
  totalDutyDays: number;

  attendancePercentage: number;
  promotionProgress: number;

  remainingHours: number;
  remainingDays: number;

  lastDuty: string | null;

  isOnDuty: boolean;

  cycleName: string;

  eligible: boolean;

  /**
   * Promotion Timeline
   */
  currentRank: string;

  nextRank: string | null;

  promotionType: MemberPromotionType;

  leaderboardPosition: number | null;
}

export interface MemberActivity {
  id: string;

  type:
    | "DUTY_STARTED"
    | "DUTY_ENDED"
    | "PROMOTION"
    | "NOTIFICATION";

  title: string;

  description: string;

  createdAt: string;
}

export interface MemberDashboardData {
  profile: MemberProfile;

  statistics: MemberStatistics;

  activities: MemberActivity[];
}

export interface MemberDashboardResponse {
  success: boolean;

  data: MemberDashboardData;
}

export interface MemberDashboardError {
  success: false;

  message: string;
}