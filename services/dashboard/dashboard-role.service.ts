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
        // AuthSessionMissingError is expected when user is not logged in
        // Only log unexpected errors
        if (error && !error.message?.includes("Auth session missing")) {
          console.error("Auth:", error);
        }
        return null;
      }

      const discordId =
        user.user_metadata?.provider_id ??
        user.user_metadata?.sub ??
        user.app_metadata?.provider_id ??
        user.identities?.find(i => i.provider === "discord")?.identity_data?.provider_id ??
        user.identities?.find(i => i.provider === "discord")?.id ??
        user.id;

      const { data: member, error: memberError } = await supabase
        .from("members")
        .select("*")
        .eq("discord_id", String(discordId))
        .maybeSingle();

      if (memberError) {
        console.error("Member lookup:", memberError);
        return null;
      }

      if (!member) {
        console.error("No member linked to Discord ID:", discordId);
        return null;
      }

      return {
  id: member.id,
  discordId: member.discord_id ?? "",
  discordUsername: member.discord_username ?? "",
  discordAvatar: member.discord_avatar ?? "",
  badgeNumber: member.badge_number,
  fullName: member.full_name,
  rank: member.rank,
  dashboard: MANAGEMENT_RANKS.includes(member.rank)
    ? "management"
    : "member",
};
    } catch (err) {
      console.error("DashboardRoleService:", err);
      return null;
    }
  }
}
