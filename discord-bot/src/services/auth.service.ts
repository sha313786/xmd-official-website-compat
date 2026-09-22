import crypto from "node:crypto";
import { supabase } from "../config/supabase";
import { logger } from "../utils/logger";

const CODE_LENGTH = 6;
const EXPIRY_MINUTES = 10;

export class AuthService {
  /**
   * Generate a random verification code.
   */
  static generateCode(): string {
    return crypto
      .randomInt(0, 999999)
      .toString()
      .padStart(CODE_LENGTH, "0");
  }

  /**
   * Create a new verification code for a Discord user.
   */
  static async createVerification(
    discordId: string
  ): Promise<string> {
    const code = this.generateCode();

    const expiresAt = new Date(
      Date.now() + EXPIRY_MINUTES * 60 * 1000
    ).toISOString();

    const { error } = await supabase
      .from("discord_verifications")
      .insert({
        discord_id: discordId,
        verification_code: code,
        expires_at: expiresAt,
        verified: false,
      });

    if (error) {
      logger.error(error.message);
      throw error;
    }

    return code;
  }

  /**
   * Validate a verification code.
   */
  static async validateCode(code: string) {
    const { data, error } = await supabase
      .from("discord_verifications")
      .select("*")
      .eq("verification_code", code)
      .single();

    if (error || !data) {
      return null;
    }

    if (data.verified) {
      return null;
    }

    const expired =
      new Date(data.expires_at).getTime() < Date.now();

    if (expired) {
      return null;
    }

    return data;
  }

  /**
   * Mark verification as completed.
   */
  static async markVerified(id: number) {
    const { error } = await supabase
      .from("discord_verifications")
      .update({
        verified: true,
      })
      .eq("id", id);

    if (error) {
      logger.error(error.message);
      throw error;
    }
  }

  /**
   * Delete expired verification codes.
   */
  static async cleanupExpired() {
    const { error } = await supabase
      .from("discord_verifications")
      .delete()
      .lt("expires_at", new Date().toISOString());

    if (error) {
      logger.error(error.message);
    }
  }
}