export type MemberStatus =
  | "Active"
  | "Inactive"
  | "Suspended"
  | "Retired";

export interface Member {
  id: string;

  discordId: string;
  badgeNumber: string;

  fullName: string;
  rank: string;
  department: string;

  avatar: string;

  joinedAt: string;
  status: MemberStatus;

  dutyHours: number;
  dutyDays: number;

  promotionProgress: number;
}