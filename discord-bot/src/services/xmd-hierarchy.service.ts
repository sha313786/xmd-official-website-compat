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
  private hierarchyMessageId: string | null = null;

  async initialize(client: Client<true>): Promise<void> {
    const channel = await client.channels.fetch(
      XMDHierarchyConfig.CHANNEL_ID
    );

    if (!channel || !channel.isTextBased()) {
      throw new Error(
        `XMD hierarchy channel ${XMDHierarchyConfig.CHANNEL_ID} was not found.`
      );
    }

    /*
     * Do NOT call guild.members.fetch() here.
     *
     * The bot already has its guild member cache populated.
     * Fetching the entire guild causes Discord Gateway opcode 8
     * requests and can trigger rate limits.
     */
    await this.createHierarchyMessage(
      channel as TextChannel
    );

    console.log(
      `[XMD HIERARCHY] Initialization completed. Message: ${this.hierarchyMessageId}`
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

        await this.update(
          channel as TextChannel
        );
      } catch (error) {
        console.error(
          "[XMD HIERARCHY] Failed to update:",
          error
        );
      }
    }, 1000);
  }

  private async createHierarchyMessage(
    channel: TextChannel
  ): Promise<void> {
    const guild = channel.guild;

    /*
     * Use the existing member cache.
     * Do not fetch all guild members.
     */
    const embed = this.buildEmbed(guild);

    const message = await channel.send({
      embeds: [embed],
    });

    this.hierarchyMessageId = message.id;

    console.log(
      `[XMD HIERARCHY] Created new message: ${message.id}`
    );
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

      /*
       * Use cached members instead of guild.members.fetch().
       * This prevents Gateway opcode 8 rate limits.
       */
      const embed = this.buildEmbed(guild);

      if (!this.hierarchyMessageId) {
        await this.createHierarchyMessage(channel);
        return;
      }

      try {
        const message = await channel.messages.fetch(
          this.hierarchyMessageId
        );

        await message.edit({
          embeds: [embed],
        });

        console.log(
          `[XMD HIERARCHY] Updated message: ${message.id}`
        );
      } catch {
        console.log(
          "[XMD HIERARCHY] Message no longer exists. Creating a new one..."
        );

        await this.createHierarchyMessage(channel);
      }
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
            .map((member) => `> ${member}`)
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