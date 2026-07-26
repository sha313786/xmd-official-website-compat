export type RecruitmentCycleStatus = "draft" | "active" | "closed";

export interface RecruitmentCycle {
  id: string;

  title: string;
  description: string | null;

  start_date: string;
  end_date: string;

  status: RecruitmentCycleStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateRecruitmentCycleData {
  title: string;
  description?: string;

  start_date: string;
  end_date: string;
}

export interface UpdateRecruitmentCycleData {
  title?: string;
  description?: string;

  start_date?: string;
  end_date?: string;

  status?: RecruitmentCycleStatus;
}

export interface RecruitmentCycleStatistics {
  total: number;
  active: number;
  draft: number;
  closed: number;
}