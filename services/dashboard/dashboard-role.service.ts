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
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth Error:", authError);
        return null;
      }

      if (!user) {
        console.error("No authenticated user.");
        return null;
      }

      console.log("========== AUTH USER ==========");
      console.log(user);

      // Resolve Discord ID
      const discordId =
        user.user_metadata?.provider_id ||
        user.user_metadata?.sub ||
        user.app_metadata?.provider_id ||
        user.identities?.find(
          (identity) => identity.provider === "discord"
        )?.identity_data?.provider_id ||
        user.identities?.find(
          (identity) => identity.provider === "discord"
        )?.id;

      console.log("Resolved Discord ID:", discordId);

      if (!discordId) {
        console.error("Discord ID not found.");
        return null;
      }

      // Get the latest verified record
      const {
        data: verifications,
        error: verificationError,
      } = await supabase
        .from("discord_verifications")
        .select("*")
        .eq("discord_id", String(discordId))
        .eq("verified", true)
        .order("created_at", { ascending: false })
        .limit(1);

      console.log("Verification Records:", verifications);
      console.log("Verification Error:", verificationError);

      if (verificationError) {
        console.error(verificationError);
        return null;
      }

      if (!verifications || verifications.length === 0) {
        console.error("No verified record found.");
        return null;
      }

      const verification = verifications[0];

      // Load member
      const {
        data: member,
        error: memberError,
      } = await supabase
        .from("members")
        .select("*")
        .eq("id", verification.member_id)
        .maybeSingle();

      console.log("Member:", member);
      console.log("Member Error:", memberError);

      if (memberError) {
        console.error(memberError);
        return null;
      }

      if (!member) {
        console.error("Member not found.");
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
    } catch (err) {
      console.error("DashboardRoleService Error:", err);
      return null;
    }
  }
}