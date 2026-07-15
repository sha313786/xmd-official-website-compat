import { createClient } from "@/lib/supabase/client";

import {
  RecruitmentApplication,
  RecruitmentApplicationInsert,
  RecruitmentApplicationUpdate,
} from "@/types/recruitment";

export const applicationService = {
  async getAll(): Promise<RecruitmentApplication[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
  },

  async getMonthlyApplications(): Promise<
  {
    month: string;
    applications: number;
  }[]
> {
  const applications = await this.getAll();

  const monthMap = new Map<string, number>();

  applications.forEach((application) => {
    const date = new Date(application.created_at);

    const month = date.toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });

    monthMap.set(month, (monthMap.get(month) ?? 0) + 1);
  });

  return Array.from(monthMap.entries()).map(([month, applications]) => ({
    month,
    applications,
  }));
},
  
  async approve(id: string): Promise<RecruitmentApplication> {
  return this.update(id, {
    status: "approved",
  });
},

async reject(id: string): Promise<RecruitmentApplication> {
  return this.update(id, {
    status: "rejected",
  });
},

  async getById(id: string): Promise<RecruitmentApplication | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("recruitment_applications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(
    application: RecruitmentApplicationInsert
  ): Promise<RecruitmentApplication> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("recruitment_applications")
      .insert(application)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async update(
    id: string,
    updates: RecruitmentApplicationUpdate
  ): Promise<RecruitmentApplication> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("recruitment_applications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async delete(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("recruitment_applications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};