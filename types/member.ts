export type MemberStatus =
  | "Active"
  | "Inactive"
  | "Suspended"
  | "Retired";

export interface Member {
  id: string;

  fullName: string;
  badgeNumber: string;

  discordId: string | null;

  rank: string;
  department: string;

  status: MemberStatus;

  avatar: string | null;

  joinedAt: string | null;

  dutyHours: number;
  dutyDays: number;

  promotionProgress?: number;

  createdAt?: string;
  updatedAt?: string;
}