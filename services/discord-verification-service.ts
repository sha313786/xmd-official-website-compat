import { createClient } from "@/lib/supabase/client";

export interface DiscordVerification {
  id: number;
  discord_id: string;
  verification_code: string;
  verified: boolean;
  expires_at: string;
  created_at: string;
}

export class DiscordVerificationService {
  static async verifyCode(code: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("discord_verifications")
      .select("*")
      .eq("verification_code", code)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: "Invalid verification code.",
      };
    }

    if (data.verified) {
      return {
        success: false,
        message: "This verification code has already been used.",
      };
    }

    if (new Date(data.expires_at) < new Date()) {
      return {
        success: false,
        message: "This verification code has expired.",
      };
    }

    return {
      success: true,
      data: data as DiscordVerification,
    };
  }

  static async markVerified(id: number) {
    const supabase = createClient();
    const { error } = await supabase
      .from("discord_verifications")
      .update({
        verified: true,
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
  }
}