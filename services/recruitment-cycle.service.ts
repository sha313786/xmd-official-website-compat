import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface RecruitmentCycle {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

class RecruitmentCycleService {
  async getCycles(): Promise<RecruitmentCycle[]> {
    const { data, error } = await supabase
      .from("recruitment_cycles")
      .select("*")
      .order("start_date", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  async getCycle(
    id: string
  ): Promise<RecruitmentCycle | null> {
    const { data, error } = await supabase
      .from("recruitment_cycles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async getActiveCycle(): Promise<RecruitmentCycle | null> {
    const { data, error } = await supabase
      .from("recruitment_cycles")
      .select("*")
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async createCycle(
    cycle: Omit<
      RecruitmentCycle,
      | "id"
      | "created_at"
      | "updated_at"
      | "created_by"
      | "updated_by"
    >
  ): Promise<RecruitmentCycle> {
    const { data, error } = await supabase
      .from("recruitment_cycles")
      .insert(cycle)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async updateCycle(
    id: string,
    updates: Partial<RecruitmentCycle>
  ): Promise<RecruitmentCycle> {
    const { data, error } = await supabase
      .from("recruitment_cycles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async deleteCycle(
    id: string
  ): Promise<void> {
    const { error } = await supabase
      .from("recruitment_cycles")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

  async activateCycle(
    id: string
  ): Promise<void> {
    // Deactivate current active cycle
    const { error: deactivateError } =
      await supabase
        .from("recruitment_cycles")
        .update({
          is_active: false,
        })
        .eq("is_active", true);

    if (deactivateError) {
      throw deactivateError;
    }

    // Activate selected cycle
    const { error: activateError } =
      await supabase
        .from("recruitment_cycles")
        .update({
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

    if (activateError) {
      throw activateError;
    }

    /// Keep recruitment settings in sync
const { data: settings } = await supabase
  .from("recruitment_settings")
  .select("id")
  .limit(1)
  .single();

if (!settings) {
  throw new Error("Recruitment settings not found.");
}

const { error: settingsError } = await supabase
  .from("recruitment_settings")
  .update({
    current_cycle_id: id,
    updated_at: new Date().toISOString(),
  })
  .eq("id", settings.id);

if (settingsError) {
  throw settingsError;
}
  }
}

export const recruitmentCycleService =
  new RecruitmentCycleService();