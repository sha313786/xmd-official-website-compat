export type RecruitmentStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface RecruitmentApplication {
  id: string;

  // Personal Information
  full_name: string;
  character_name: string;
  real_age: number;

  // Roleplay Information
  medical_experience: string;
  current_occupation: string | null;

  gang_member: boolean;
  gang_name: string | null;

  // Availability
  preferred_shift: string;
  hours_per_day: number;

  // Questions
  why_join: string;
  why_choose_you: string;
  strengths: string;
  weaknesses: string;
  patient_scenario: string;

  // Declaration
  declaration: boolean;

  // Review
  status: RecruitmentStatus;
  reviewed_by: string | null;
  review_notes: string | null;

  created_at: string;
  updated_at: string;
}

export type RecruitmentApplicationInsert = Omit<
  RecruitmentApplication,
  | "id"
  | "status"
  | "reviewed_by"
  | "review_notes"
  | "created_at"
  | "updated_at"
>;

export type RecruitmentApplicationUpdate = Partial<
  RecruitmentApplicationInsert
> & {
  status?: RecruitmentStatus;
  reviewed_by?: string | null;
  review_notes?: string | null;
};