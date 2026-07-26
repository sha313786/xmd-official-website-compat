import { createClient } from "@/lib/supabase/client";

import type {
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
  async getApplications(): Promise<RecruitmentApplication[]> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as RecruitmentApplication[];
  }

  async getApplication(
    id: string
  ): Promise<RecruitmentApplication | null> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return data as RecruitmentApplication | null;
  }

  async createApplication(
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

  async updateApplication(
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

  async deleteApplication(
    id: string
  ): Promise<void> {
    const { error } = await supabase
      .from("recruitment_applications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  async reviewApplication(
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

  async updateStatus(
    id: string,
    status: RecruitmentStatus
  ): Promise<RecruitmentApplication> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as RecruitmentApplication;
  }

  async getStatistics(): Promise<RecruitmentStatistics> {
    const applications =
      await this.getApplications();

    return {
      total: applications.length,

      pending: applications.filter(
        (a) => a.status === "pending"
      ).length,

      approved: applications.filter(
        (a) => a.status === "approved"
      ).length,

      rejected: applications.filter(
        (a) => a.status === "rejected"
      ).length,
    };
  }

  async getApplicationsByStatus(
    status: RecruitmentStatus
  ): Promise<RecruitmentApplication[]> {
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .eq("status", status)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as RecruitmentApplication[];
  }
}

export const applicationService =
  new ApplicationService();