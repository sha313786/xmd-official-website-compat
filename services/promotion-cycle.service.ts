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
  .select();

console.log("UPDATE ID:", id);
console.log("UPDATE DATA:", data);
console.log("UPDATE ERROR:", error);

    if (error) throw error;

    return data;
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