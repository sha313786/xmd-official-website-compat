import { createClient } from "@/lib/supabase/client";

import {
  PromotionCycle,
  PromotionResult,
} from "@/types";

export const memberPromotionService = {
  async getActiveCycle(): Promise<PromotionCycle | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("promotion_cycles")
      .select("*")
      .eq("is_active", true)
      .single();

    if (error) return null;

    return data;
  },

  async getMemberResult(
    cycleId: string,
    memberId: string
  ): Promise<PromotionResult | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("promotion_results")
      .select("*")
      .eq("cycle_id", cycleId)
      .eq("member_id", memberId)
      .single();

    if (error) return null;

    return data;
  },
};