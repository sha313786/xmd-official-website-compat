"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
const supabase_1 = require("../config/supabase");
class VerificationService {
    static async createVerificationCode(code, expiresAt) {
        return supabase_1.supabase
            .from("discord_verifications")
            .insert({
            verification_code: code,
            expires_at: expiresAt.toISOString(),
        })
            .select()
            .single();
    }
    static async getVerificationCode(code) {
        return supabase_1.supabase
            .from("discord_verifications")
            .select("*")
            .eq("verification_code", code)
            .single();
    }
    static async verifyCode(code, discordId, username) {
        return supabase_1.supabase
            .from("discord_verifications")
            .update({
            discord_id: discordId,
            discord_username: username,
            verified: true,
        })
            .eq("verification_code", code)
            .select()
            .single();
    }
    static async deleteExpiredCodes() {
        return supabase_1.supabase
            .from("discord_verifications")
            .delete()
            .lt("expires_at", new Date().toISOString());
    }
}
exports.VerificationService = VerificationService;
