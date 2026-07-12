import { supabase } from "@/lib/supabase";

export class VerificationService {
  static async verifyMember(
    badgeNumber: string,
    verificationCode: string
  ) {
    // Find verification code
    const {
      data: verification,
      error: verificationError,
    } = await supabase
      .from("discord_verifications")
      .select("*")
      .eq("verification_code", verificationCode)
      .single();

    if (verificationError || !verification) {
      throw new Error("Invalid verification code.");
    }

    if (verification.verified) {
      throw new Error("This verification code has already been used.");
    }

    // Find member
    const {
      data: member,
      error: memberError,
    } = await supabase
      .from("members")
      .select("*")
      .eq("badge_number", badgeNumber)
      .single();

    if (memberError || !member) {
      throw new Error("Invalid badge number.");
    }

    // Prevent member from being linked twice
    if (member.discord_id) {
      throw new Error(
        "This member is already linked to a Discord account."
      );
    }

    // Prevent Discord account from being linked twice
    const { data: existingDiscord } = await supabase
      .from("members")
      .select("id")
      .eq("discord_id", verification.discord_id)
      .maybeSingle();

    if (existingDiscord) {
      throw new Error(
        "This Discord account is already linked to another member."
      );
    }

    // Update verification record
    const { error: verificationUpdateError } = await supabase
      .from("discord_verifications")
      .update({
        verified: true,
        member_id: member.id,
      })
      .eq("id", verification.id);

    if (verificationUpdateError) {
      throw verificationUpdateError;
    }

    // Link Discord account to member
    const { error: memberUpdateError } = await supabase
      .from("members")
      .update({
        discord_id: verification.discord_id,
      })
      .eq("id", member.id);

    if (memberUpdateError) {
      throw memberUpdateError;
    }

    return true;
  }
}