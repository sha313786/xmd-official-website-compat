import { supabase } from "@/lib/supabase";

import {
  DutyLog,
  Member,
  PromotionCycle,
  PromotionResult,
} from "@/types";
import { PromotionEngine } from "./promotion-engine.service";

export const promotionService = {
  // Promotion Cycles

  async getCycles(): Promise<PromotionCycle[]> {
    const { data, error } = await supabase
      .from("promotion_cycles")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) throw error;

    return data ?? [];
  },

  async getCycle(id: string): Promise<PromotionCycle | null> {
    const { data, error } = await supabase
      .from("promotion_cycles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return data;
  },
  async getActiveCycle(): Promise<PromotionCycle | null> {
  const { data, error } = await supabase
    .from("promotion_cycles")
    .select("*")
    .eq("is_active", true)
    .single();

  if (error) {
    return null;
  }

  return data;
},

  // Duty Logs

  async getDutyLogs(cycleId: string): Promise<DutyLog[]> {
    const { data, error } = await supabase
      .from("duty_logs")
      .select("*")
      .eq("cycle_id", cycleId)
      .order("normalized_duty_date", {
        ascending: true,
      });

    if (error) throw error;

    return data ?? [];
  },

  // Promotion Results

  async getPromotionResults(
    cycleId: string
  ): Promise<PromotionResult[]> {
    const { data, error } = await supabase
      .from("promotion_results")
      .select("*")
      .eq("cycle_id", cycleId)
      .order("position", {
        ascending: true,
      });

    if (error) throw error;

    return data ?? [];
  },

  async getMemberResult(
    cycleId: string,
    memberId: string
  ): Promise<PromotionResult | null> {
    const { data, error } = await supabase
      .from("promotion_results")
      .select("*")
      .eq("cycle_id", cycleId)
      .eq("member_id", memberId)
      .single();

    if (error) return null;

    return data;
  },

  async savePromotionResult(
    result: Omit<
      PromotionResult,
      "id" | "created_at" | "updated_at"
    >
  ) {
    const { data, error } = await supabase
      .from("promotion_results")
      .upsert(result, {
        onConflict: "cycle_id,member_id",
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async deleteCycleResults(cycleId: string) {
    const { error } = await supabase
      .from("promotion_results")
      .delete()
      .eq("cycle_id", cycleId);

    if (error) throw error;
  },
    async calculateCycleResults(cycleId: string) {
    const logs = await this.getDutyLogs(cycleId);

    console.log("Duty logs count:", logs.length);
    console.log(logs);
    

    const { data: members, error } = await supabase
      .from("members")
      .select("id, rank");

    if (error) throw error;

    const memberRanks: Record<string, string> = {};

    (members as Pick<Member, "id" | "rank">[]).forEach(
      (member) => {
        memberRanks[member.id] = member.rank;
      }
    );

    const results = PromotionEngine.processCycle(
      cycleId,
      logs,
      memberRanks
    );

    return results;
  },

  async saveCycleResults(cycleId: string) {
    const results =
      await this.calculateCycleResults(cycleId);

    await this.deleteCycleResults(cycleId);

    for (const result of results) {
      await this.savePromotionResult(result);
    }

    return results;
  },
    async calculateActiveCycle() {
    const cycle = await this.getActiveCycle();

    if (!cycle) {
      throw new Error("No active promotion cycle found.");
    }

    return this.saveCycleResults(cycle.id);
  },

  async refreshActiveCycle() {
    return this.calculateActiveCycle();
  },

  async getPromotionSummary(cycleId: string) {
    const results =
      await this.getPromotionResults(cycleId);

    return PromotionEngine.getSummary(results);
  },

  async getLeaderboard(cycleId: string) {
    const results =
      await this.getPromotionResults(cycleId);

    return PromotionEngine.sortResults(results);
  },
};