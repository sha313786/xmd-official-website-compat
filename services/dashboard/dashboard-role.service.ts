import { createClient } from "@/lib/supabase/client";

const supabase = createClient();


export interface DashboardUser {
  id: string;
  discordId: string;
  badgeNumber: string;
  fullName: string;
  rank: string;
  dashboard: "member" | "management";
}

export class DashboardRoleService {
  static async getDashboardUser(): Promise<DashboardUser | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Discord OAuth ID
    const discordId = user.identities?.find(
      (identity) => identity.provider === "discord"
    )?.id;

    if (!discordId) {
      console.error("Discord identity not found.");
      return null;
    }

    // Find verified Discord account
    const { data: verification, error: verificationError } = await supabase
      .from("discord_verifications")
      .select("member_id, verified")
      .eq("discord_id", discordId)
      .eq("verified", true)
      .single();

    console.log("Discord ID:", discordId);
    console.log("Verification:", verification);
    console.log("Verification Error:", verificationError);

    if (verificationError || !verification) {
      return null;
    }

    // Load member
    const { data: member, error: memberError } = await supabase
      .from("members")
      .select(
        `
          id,
          discord_id,
          badge_number,
          full_name,
          rank,
          department
        `
      )
      .eq("id", verification.member_id)
      .single();

    console.log("Member:", member);
    console.log("Member Error:", memberError);

    if (memberError || !member) {
      return null;
    }

    const isManagement =
      member.department?.trim().toUpperCase() === "MANAGEMENT";

    return {
      id: member.id,
      discordId: member.discord_id,
      badgeNumber: member.badge_number,
      fullName: member.full_name,
      rank: member.rank,
      dashboard: isManagement ? "management" : "member",
    };
 }
}