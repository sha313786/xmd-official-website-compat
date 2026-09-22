import { createClient } from "@/lib/supabase/client";
import type {
  InterviewStatus,
  RecruitmentApplication,
  RecruitmentApplicationInsert,
  RecruitmentApplicationUpdate,
  RecruitmentStatus,
} from "@/types/recruitment";

const supabase = createClient();

export interface RecruitmentStatistics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface ReviewApplicationRequest {
  status: RecruitmentStatus;
  reviewed_by: string | null;
  review_notes: string | null;
}

class ApplicationService {
  async getAll(): Promise<RecruitmentApplication[]> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as RecruitmentApplication[];
  }

  async getById(id: string): Promise<RecruitmentApplication | null> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data as RecruitmentApplication | null;
  }

  async create(
    application: RecruitmentApplicationInsert
  ): Promise<RecruitmentApplication> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .insert(application)
      .select()
      .single();

    if (error) throw error;
    return data as RecruitmentApplication;
  }

  async update(
    id: string,
    updates: RecruitmentApplicationUpdate
  ): Promise<RecruitmentApplication> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as RecruitmentApplication;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("recruitment_applications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  async approve(
    id: string,
    reviewedBy: string | null,
    reviewNotes: string | null = null
  ): Promise<RecruitmentApplication> {
    return this.review(id, {
      status: "approved",
      reviewed_by: reviewedBy,
      review_notes: reviewNotes,
    });
  }

  async reject(
    id: string,
    reviewedBy: string | null,
    reviewNotes: string | null = null
  ): Promise<RecruitmentApplication> {
    return this.review(id, {
      status: "rejected",
      reviewed_by: reviewedBy,
      review_notes: reviewNotes,
    });
  }

  async review(
    id: string,
    review: ReviewApplicationRequest
  ): Promise<RecruitmentApplication> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .update({
        status: review.status,
        reviewed_by: review.reviewed_by,
        review_notes: review.review_notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as RecruitmentApplication;
  }

  async reviewApplication(
    id: string,
    review: ReviewApplicationRequest
  ): Promise<RecruitmentApplication> {
    return this.review(id, review);
  }

  async updateStatus(
    id: string,
    status: RecruitmentStatus
  ): Promise<RecruitmentApplication> {
    return this.update(id, { status });
  }

  async updateInterviewStatus(
    id: string,
    interviewStatus: InterviewStatus
  ): Promise<RecruitmentApplication> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .update({
        interview_status: interviewStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    const application = data as RecruitmentApplication;

    if (interviewStatus === "passed") {
      await this.createMemberFromApplication(id);
      const refreshed = await this.getById(id);
      return refreshed ?? application;
    }

    return application;
  }

  async createMemberFromApplication(id: string): Promise<string> {
    const { data, error } = await supabase.rpc(
      "create_member_from_application",
      {
        p_application_id: id,
      }
    );

    if (error) throw error;
    return data as string;
  }

  async getStatistics(): Promise<RecruitmentStatistics> {
    const applications = await this.getAll();

    return {
      total: applications.length,
      pending: applications.filter((a) => a.status === "pending").length,
      approved: applications.filter((a) => a.status === "approved").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    };
  }

  async getByStatus(
    status: RecruitmentStatus
  ): Promise<RecruitmentApplication[]> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as RecruitmentApplication[];
  }

  async getApplicationsByStatus(
    status: RecruitmentStatus
  ): Promise<RecruitmentApplication[]> {
    return this.getByStatus(status);
  }

  async getByCycle(cycleId: string): Promise<RecruitmentApplication[]> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .eq("cycle_id", cycleId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as RecruitmentApplication[];
  }

  async getMonthlyApplications() {
    const applications = await this.getAll();

    const monthly = new Map<string, number>();

    for (const application of applications) {
      const month = application.created_at.slice(0, 7);
      monthly.set(month, (monthly.get(month) ?? 0) + 1);
    }

    return Array.from(monthly.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({
        month,
        count,
      }));
  }

  async getRecentApplications(limit = 5): Promise<RecruitmentApplication[]> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as RecruitmentApplication[];
  }
}

export const applicationService = new ApplicationService();
