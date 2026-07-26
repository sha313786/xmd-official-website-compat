export type RecruitmentStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface RecruitmentApplication {
  id: string;

  full_name: string;
  discord_username: string;
  discord_id: string;

  age: number;
  country: string;
  timezone: string;

  experience: string;
  reason: string;

  status: RecruitmentStatus;

  reviewed_by: string | null;
  review_notes: string | null;

  created_at: string;
  updated_at: string;
}

export type RecruitmentApplicationInsert = Omit<
  RecruitmentApplication,
  "id" | "created_at" | "updated_at"
>;

export type RecruitmentApplicationUpdate = Partial<
  RecruitmentApplicationInsert
>;