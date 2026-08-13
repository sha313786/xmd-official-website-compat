export interface GoogleFormMember {
  /**
   * Google Sheets row number.
   */
  rowNumber: number;

  /**
   * Google Form submission timestamp.
   */
  timestamp: string;

  /**
   * Character name entered by the member.
   */
  fullName: string;

  /**
   * Discord username.
   */
  discordUsername: string;

  /**
   * Discord user ID.
   */
  discordId: string;

  /**
   * Current XMD rank.
   */
  rank: string;

  /**
   * Optional join date.
   */
  joinDate: string | null;
}

export type ImportValidationErrorType =
  | "MISSING_FULL_NAME"
  | "MISSING_DISCORD_USERNAME"
  | "MISSING_DISCORD_ID"
  | "INVALID_DISCORD_ID"
  | "INVALID_RANK"
  | "INVALID_JOIN_DATE"
  | "DUPLICATE_MEMBER"
  | "DUPLICATE_DISCORD_ID";

export interface ImportValidationError {
  rowNumber: number;

  type: ImportValidationErrorType;

  message: string;
}

export interface ImportPreviewMember extends GoogleFormMember {
  selected: boolean;

  valid: boolean;

  errors: ImportValidationError[];

  badgeNumber?: string;

  department?: string;
}

export interface ImportSummary {
  processed: number;

  imported: number;

  skipped: number;

  duplicateMembers: number;

  duplicateDiscordIds: number;

  invalidRanks: number;

  invalidDiscordIds: number;

  invalidJoinDates: number;

  missingFields: number;
}

export interface ImportHistory {
  id: string;

  importedBy: string;

  processed: number;

  imported: number;

  skipped: number;

  summary: ImportSummary;

  createdAt: string;
}

export interface DepartmentMapping {
  rank: string;

  department: string;
}