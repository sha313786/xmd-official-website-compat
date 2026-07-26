import { createClient } from "@/lib/supabase/server";

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

export class DashboardRoleServerService {
  static async getDashboardUser(): Promise<DashboardUser | null> {
    const supabase = await createClient();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
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

      const { data: member, error: memberError } = await supabase
        .from("members")
        .select("*")
        .eq("discord_id", String(discordId))
        .maybeSingle();

      if (memberError || !member) {
        return null;
      }

      const isManagement = MANAGEMENT_RANKS.includes(member.rank);

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
    } catch {
      return null;
    }
  }
}