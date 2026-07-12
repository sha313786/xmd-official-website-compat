import { supabase } from "../config/supabase";

export class VerificationService {
  static async createVerificationCode(
    code: string,
    expiresAt: Date
  ) {
    return supabase
      .from("discord_verifications")
      .insert({
        verification_code: code,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();
  }

  static async getVerificationCode(code: string) {
    return supabase
      .from("discord_verifications")
      .select("*")
      .eq("verification_code", code)
      .single();
  }
    static async verifyCode(
    code: string,
    discordId: string,
    username: string
  ) {
    return supabase
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
    return supabase
      .from("discord_verifications")
      .delete()
      .lt("expires_at", new Date().toISOString());
  }
}