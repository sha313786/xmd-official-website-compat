"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionCycleService = void 0;
const supabase_1 = require("../config/supabase");
class PromotionCycleService {
    static async getActiveCycle() {
        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabase_1.supabase
            .from("promotion_cycles")
            .select("id, name, start_date, end_date, is_active, is_locked")
            .eq("is_active", true)
            .eq("is_locked", false)
            .lte("start_date", today)
            .gte("end_date", today)
            .single();
        if (error || !data) {
            throw new Error("No active promotion cycle found.");
        }
        return data;
    }
}
exports.PromotionCycleService = PromotionCycleService;
