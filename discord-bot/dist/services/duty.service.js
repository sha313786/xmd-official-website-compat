"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dutyService = exports.DutyService = void 0;
const supabase_1 = require("../config/supabase");
const member_service_1 = require("./member.service");
const promotion_cycle_service_1 = require("./promotion-cycle.service");
const duty_log_service_1 = require("./duty-log.service");
class DutyService {
    /**
     * Get member by Discord ID.
     */
    static async getMember(discordId) {
        const member = await member_service_1.MemberService.getByDiscordId(discordId);
        if (!member) {
            throw new Error("Member not found.");
        }
        return member;
    }
    /**
     * Get the active promotion cycle.
     */
    static async getActiveCycle() {
        const cycle = await promotion_cycle_service_1.PromotionCycleService.getActiveCycle();
        if (!cycle) {
            throw new Error("No active promotion cycle found.");
        }
        return cycle;
    }
    /**
     * Get the latest active duty session.
     */
    static async getActiveSession(memberId) {
        const { data, error } = await supabase_1.supabase
            .from("duty_logs")
            .select("*")
            .eq("member_id", memberId)
            .is("duty_end", null)
            .order("duty_start", { ascending: false })
            .limit(1)
            .maybeSingle();
        if (error) {
            throw error;
        }
        return data;
    }
    /**
     * Calculate total duty hours.
     */
    static calculateDutyHours(start, end) {
        const hours = (end.getTime() - start.getTime()) /
            (1000 * 60 * 60);
        return Number(hours.toFixed(2));
    }
    /**
     * Normalize duty date.
     *
     * Rule:
     * 00:00–01:59 → Previous day
     * 02:00+      → Same day
     */
    static normalizeDutyDate(date) {
        const normalized = new Date(date);
        if (normalized.getHours() < 2) {
            normalized.setDate(normalized.getDate() - 1);
        }
        return normalized.toISOString().split("T")[0];
    }
    /**
     * Start a duty session.
     */
    static async startDuty(discordId) {
        const member = await this.getMember(discordId);
        const cycle = await this.getActiveCycle();
        const activeSession = await this.getActiveSession(member.id);
        if (activeSession) {
            throw new Error("You are already On Duty.");
        }
        const { data, error } = await supabase_1.supabase
            .from("duty_logs")
            .insert({
            cycle_id: cycle.id,
            member_id: member.id,
            duty_start: new Date().toISOString(),
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    /**
     * End the caller's active duty session.
     */
    static async endDuty(discordId) {
        const member = await this.getMember(discordId);
        return this.endDutyForMember(member.id);
    }
    /**
     * Force-end an active duty session for a specific member.
     *
     * This only closes the currently open duty_logs row.
     * Existing promotion and duty calculation rules are unchanged.
     */
    static async endDutyForMember(memberId) {
        const session = await this.getActiveSession(memberId);
        if (!session) {
            throw new Error("This member is not currently On Duty.");
        }
        const dutyEnd = new Date();
        const dutyStart = new Date(session.duty_start);
        const dutyHours = this.calculateDutyHours(dutyStart, dutyEnd);
        const normalizedDutyDate = this.normalizeDutyDate(dutyStart);
        const { data, error } = await supabase_1.supabase
            .from("duty_logs")
            .update({
            duty_end: dutyEnd.toISOString(),
            duty_hours: dutyHours,
            normalized_duty_date: normalizedDutyDate,
            updated_at: dutyEnd.toISOString(),
        })
            .eq("id", session.id)
            .is("duty_end", null)
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    /**
     * Auto-ends all active duties at 1:00 AM and notifies Discord.
     */
    static async autoEndAllDuties(client) {
        console.log("[AUTO OFF-DUTY] Checking for active duty sessions at 1:00 AM...");
        const { data: activeSessions, error } = await supabase_1.supabase
            .from("duty_logs")
            .select("*")
            .is("duty_end", null);
        if (error) {
            console.error("[AUTO OFF-DUTY] Failed to fetch active sessions:", error);
            return [];
        }
        if (!activeSessions || activeSessions.length === 0) {
            console.log("[AUTO OFF-DUTY] No active sessions found.");
            return [];
        }
        const closedList = [];
        for (const session of activeSessions) {
            try {
                const closed = await this.endDutyForMember(session.member_id);
                if (client) {
                    const { data: member } = await supabase_1.supabase
                        .from("members")
                        .select("*")
                        .eq("id", session.member_id)
                        .maybeSingle();
                    if (member) {
                        await duty_log_service_1.dutyLogService.logOffDuty(client, member.discord_id || member, closed);
                    }
                }
                closedList.push(closed);
            }
            catch (err) {
                console.error(`[AUTO OFF-DUTY] Error closing duty for member ${session.member_id}:`, err);
            }
        }
        console.log(`[AUTO OFF-DUTY] Successfully auto-ended ${closedList.length} session(s).`);
        return closedList;
    }
}
exports.DutyService = DutyService;
exports.dutyService = DutyService;
