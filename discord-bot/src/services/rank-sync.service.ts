import type { GuildMember } from "discord.js";
import { supabase } from "../config/supabase";
import { logger } from "../utils/logger";

/**
 * XMD Discord role hierarchy.
 *
 * IMPORTANT:
 * Keep this ordered from highest rank to lowest rank.
 */
const XMD_RANK_ROLES = [
  {
    name: "Director",
    id: "1525391222158659754",
  },
  {
    name: "Chief",
    id: "1525391646936662066",
  },
  {
    name: "Assistant Chief",
    id: "1525391750103826524",
  },
  {
    name: "Clinical Operations Head",
    id: "1525391856140161045",
  },
  {
    name: "Medical Supervisor",
    id: "1525392168573992991",
  },
  {
    name: "Operational Specialist",
    id: "1525392204024123512",
  },
  {
    name: "Medical Officer",
    id: "1525392245216514128",
  },
  {
    name: "Senior Specialist",
    id: "1525392344973836380",
  },
  {
    name: "Senior Surgeon",
    id: "1525392415744331946",
  },
  {
    name: "Surgeon",
    id: "1525392467170426880",
  },
  {
    name: "Assistant Surgeon",
    id: "1525392517959520296",
  },
  {
    name: "Senior Doctor",
    id: "1525392704324899027",
  },
  {
    name: "Doctor",
    id: "1525392923217367111",
  },
  {
    name: "Junior Doctor",
    id: "1525392993824276531",
  },
  {
    name: "Senior Consultant",
    id: "1525393070621986906",
  },
  {
    name: "Consultant",
    id: "1525393143808131142",
  },
  {
    name: "Head Nurse",
    id: "1525393398092005386",
  },
  {
    name: "Nurse",
    id: "1525430047912099911",
  },
  {
    name: "Paramedic",
    id: "1525430179298676786",
  },
  {
    name: "Trainee",
    id: "1525393512466612267",
  },
  {
    name: "Community Care",
    id: "1525393594213597255",
  },
] as const;

export class RankSyncService {
  /**
   * Get the highest XMD rank assigned to a Discord member.
   */
  static getRank(member: GuildMember): string | null {
    for (const role of XMD_RANK_ROLES) {
      if (member.roles.cache.has(role.id)) {
        return role.name;
      }
    }

    return null;
  }

  /**
   * Update the member's rank in Supabase.
   */
  static async syncMember(member: GuildMember): Promise<string | null> {
    const rank = this.getRank(member);

    if (!rank) {
      logger.warn(
        `[RankSync] No XMD rank role found for ${member.user.tag} (${member.id})`
      );

      return null;
    }

    const { error } = await supabase
      .from("members")
      .update({
        rank,
      })
      .eq("discord_id", member.id);

    if (error) {
      logger.error(
        `[RankSync] Failed to update ${member.user.tag}: ${error.message}`
      );

      throw error;
    }

    logger.info(
      `[RankSync] ${member.user.tag} (${member.id}) → ${rank}`
    );

    return rank;
  }

  /**
   * Synchronize every Discord member that is already
   * linked to an XMD website member.
   */
  static async syncGuildMembers(
    members: GuildMember[]
  ): Promise<void> {
    for (const member of members) {
      try {
        await this.syncMember(member);
      } catch (error) {
        logger.error(
          `[RankSync] Failed to sync ${member.user.tag}:`,
          error
        );
      }
    }
  }
}

export default RankSyncService;