export interface PromotionProgress {
  currentHours: number;
  requiredHours: number;
  percentage: number;
}

export interface PromotionCycle {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DutyLog {
  id: string;
  cycle_id: string;
  member_id: string;

  duty_start: string;
  duty_end: string;

  duty_hours: number;

  original_duty_date: string;
  normalized_duty_date: string;

  created_at: string;
  updated_at: string;
}

export type PromotionType =
  | "NONE"
  | "SINGLE"
  | "DOUBLE"
  | "MANAGEMENT_REWARD";

export interface PromotionResult {
  id: string;

  cycle_id: string;
  member_id: string;

  current_rank: string;
  new_rank: string | null;

  total_hours: number;
  duty_days: number;

  promotion_type: PromotionType;

  eligible: boolean;
  position: number | null;

  remarks: string | null;

  created_at: string;
  updated_at: string;
}