import { supabase } from "../config/supabase";

export interface PromotionCycle {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_locked: boolean;
}

export class PromotionCycleService {
  static async getActiveCycle(): Promise<PromotionCycle> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("promotion_cycles")
      .select(
        "id, name, start_date, end_date, is_active, is_locked"
      )
      .eq("is_active", true)
      .eq("is_locked", false)
      .lte("start_date", today)
      .gte("end_date", today)
      .single();

    if (error || !data) {
      throw new Error("No active promotion cycle found.");
    }

    return data as PromotionCycle;
  }
}