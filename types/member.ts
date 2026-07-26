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

  /**
   * Determines whether the member has
   * access to the Settings module and
   * other system administration features.
   */
  isSuperAdmin: boolean;

  /**
   * Final avatar URL used by the UI.
   * This will be the Discord CDN URL if available,
   * otherwise it falls back to the manually uploaded avatar.
   */
  avatar: string;

  /**
   * Raw Discord avatar hash stored in the database.
   */
  discordAvatar?: string | null;

  /**
   * Discord username.
   */
  discordUsername?: string | null;

  joinedAt: string | null;

  dutyHours: number;
  dutyDays: number;

  promotionProgress?: number;

  createdAt?: string;
  updatedAt?: string;
}