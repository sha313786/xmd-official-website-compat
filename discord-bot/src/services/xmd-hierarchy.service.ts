import {
  Client,
  EmbedBuilder,
  Guild,
  TextChannel,
} from "discord.js";

import { XMDHierarchyConfig } from "../config/xmd-hierarchy";

class XMDHierarchyService {
  private updating = false;
  private updateTimer: NodeJS.Timeout | null = null;

  async initialize(client: Client<true>): Promise<void> {
    const channel = await client.channels.fetch(
      XMDHierarchyConfig.CHANNEL_ID
    );

    if (!channel || !channel.isTextBased()) {
      throw new Error(
        `XMD hierarchy channel ${XMDHierarchyConfig.CHANNEL_ID} was not found.`
      );
    }

    await this.update(channel as TextChannel);

    console.log(
      "[XMD HIERARCHY] Initialization completed."
    );
  }

  scheduleUpdate(guild: Guild): void {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }

    this.updateTimer = setTimeout(async () => {
      this.updateTimer = null;

      try {
        const channel = await guild.channels.fetch(
          XMDHierarchyConfig.CHANNEL_ID
        );

        if (!channel || !channel.isTextBased()) {
          console.error(
            "[XMD HIERARCHY] Channel not found."
          );

          return;
        }

        await this.update(channel as TextChannel);
      } catch (error) {
        console.error(
          "[XMD HIERARCHY] Failed to update hierarchy:",
          error
        );
      }
    }, 1000);
  }

  private async update(
    channel: TextChannel
  ): Promise<void> {
    if (this.updating) {
      return;
    }

    this.updating = true;

    try {
      const guild = channel.guild;

      await guild.members.fetch();

      const embed = this.buildEmbed(guild);

      // Existing hierarchy message
      const message = await channel.messages.fetch(
        "1525429097423966408"
      );

      await message.edit({
        embeds: [embed],
      });

      console.log(
        `[XMD HIERARCHY] Updated message ${message.id}`
      );
    } catch (error) {
      console.error(
        "[XMD HIERARCHY] Update failed:",
        error
      );
    } finally {
      this.updating = false;
    }
  }

  private buildEmbed(guild: Guild) {
    const embed = new EmbedBuilder()
      .setTitle("📋 XMD Organizational Hierarchy")
      .setDescription(
        "Current XMD organizational structure\n\n" +
          "Automatically synchronized with Discord roles."
      )
      .setTimestamp()
      .setFooter({
        text: XMDHierarchyConfig.FOOTER_IDENTIFIER,
      });

    for (const role of XMDHierarchyConfig.roles) {
      const members = guild.members.cache.filter(
        (member) =>
          !member.user.bot &&
          member.roles.cache.has(role.id)
      );

      const memberList = members.size
        ? members
            .map(
              (member) =>
                `> ${member}`
            )
            .join("\n")
        : "> *No members*";

      embed.addFields({
        name: role.name,
        value: memberList,
        inline: false,
      });
    }

    return embed;
  }
}

export const xmdHierarchyService =
  new XMDHierarchyService();