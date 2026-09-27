import { createClient } from "@/lib/supabase/client";

import { PromotionCycle } from "@/types";

export const promotionCycleService = {
  async getCycles(): Promise<PromotionCycle[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("promotion_cycles")
      .select("*")
      .order("start_date", {
        ascending: false,
      });

    if (error) throw error;

    return data ?? [];
  },

  async createCycle(data: {
    name: string;
    start_date: string;
    end_date: string;
    required_hours?: number;
    required_days?: number;
  }): Promise<PromotionCycle> {
    const supabase = createClient();
    const { error: activeError } = await supabase
      .from("promotion_cycles")
      .update({
        is_active: false,
      })
      .eq("is_active", true);

    if (activeError) throw activeError;

    const { data: cycle, error } = await supabase
      .from("promotion_cycles")
      .insert({
        ...data,
        required_hours: data.required_hours ?? 25,
        required_days: data.required_days ?? 0,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return cycle;
  },

  async updateCycle(
    id: string,
    updates: Partial<PromotionCycle>
  ): Promise<PromotionCycle> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("promotion_cycles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Trigger promotion results recalculation if hours/days were modified
    if (updates.required_hours !== undefined || updates.required_days !== undefined || updates.is_active) {
      try {
        await fetch("/api/promotion/refresh").catch(() => {});
      } catch {}
    }

    return data as PromotionCycle;
  },

  async deleteCycle(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("promotion_cycles")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async setActiveCycle(id: string) {
    const supabase = createClient();
    await supabase
      .from("promotion_cycles")
      .update({
        is_active: false,
      })
      .eq("is_active", true);

    const { error } = await supabase
      .from("promotion_cycles")
      .update({
        is_active: true,
      })
      .eq("id", id);

    if (error) throw error;
  },
};