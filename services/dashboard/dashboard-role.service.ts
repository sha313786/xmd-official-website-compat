import { createClient } from "@/lib/supabase/client";

const MANAGEMENT_RANKS = [
  "Assistant Chief",
  "Chief",
  "Director",
];

export interface DashboardUser {
  id: string;
  discordId: string;
  discordUsername: string;
  discordAvatar: string;
  badgeNumber: string;
  fullName: string;
  rank: string;
  dashboard: "member" | "management";
}

export class DashboardRoleService {
  static async getDashboardUser(): Promise<DashboardUser | null> {
    const supabase = createClient();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        if (error && !error.message?.includes("Auth session missing")) {
          console.error("Supabase Auth Error:", error);
        }
        return null;
      }

      const discordIdentity = user.identities?.find(
        (identity) => identity.provider === "discord"
      );

      const discordId =
        discordIdentity?.identity_data?.provider_id ??
        discordIdentity?.identity_data?.sub ??
        discordIdentity?.id ??
        user.user_metadata?.provider_id ??
        user.user_metadata?.sub ??
        user.app_metadata?.provider_id ??
        user.id;

      console.group("Dashboard Role Debug");
      console.log("Supabase User:", user);
      console.log("Discord Identity:", discordIdentity);
      console.log("Resolved Discord ID:", discordId);

      const { data: member, error: memberError } = await supabase
        .from("members")
        .select("*")
        .eq("discord_id", String(discordId))
        .maybeSingle();

      console.log("Member Lookup:", member);
      console.log("Member Error:", memberError);

      if (memberError) {
        console.error("Member lookup failed:", memberError);
        console.groupEnd();
        return null;
      }

      if (!member) {
        console.error(
          "No member found with Discord ID:",
          discordId
        );
        console.groupEnd();
        return null;
      }

      const isManagement = MANAGEMENT_RANKS.includes(member.rank);

      console.log("Member Rank:", member.rank);
      console.log("Is Management:", isManagement);
      console.groupEnd();

      return {
        id: member.id,
        discordId: member.discord_id ?? "",
        discordUsername: member.discord_username ?? "",
        discordAvatar: member.discord_avatar ?? "",
        badgeNumber: member.badge_number ?? "",
        fullName: member.full_name ?? "",
        rank: member.rank ?? "",
        dashboard: isManagement ? "management" : "member",
      };
    } catch (err) {
      console.error("DashboardRoleService Error:", err);
      return null;
    }
  }
}