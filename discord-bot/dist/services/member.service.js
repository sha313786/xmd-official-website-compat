"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberService = exports.MemberService = void 0;
const supabase_1 = require("../config/supabase");
class MemberService {
    static async getByDiscordId(discordId) {
        const { data, error } = await supabase_1.supabase
            .from("members")
            .select("id, discord_id, full_name, badge_number, rank")
            .eq("discord_id", discordId)
            .maybeSingle();
        if (error) {
            throw error;
        }
        if (!data) {
            throw new Error("Your Discord account is not linked to an XMD member.");
        }
        return data;
    }
}
exports.MemberService = MemberService;
exports.memberService = MemberService;
