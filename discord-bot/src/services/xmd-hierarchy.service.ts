import {
  Client,
  EmbedBuilder,
  Guild,
  GuildMember,
  TextChannel,
} from "discord.js";

import { XMDHierarchyConfig } from "../config/xmd-hierarchy";

class XMDHierarchyService {
  private updating = false;
  private updateTimer: NodeJS.Timeout | null = null;

  /**
   * Initialize the hierarchy system.
   *
   * If the automatic hierarchy message already exists,
   * it will be reused.
   *
   * Otherwise, a new message will be created.
   */
  async initialize(client: Client<true>): Promise<void> {
    const channel = await client.channels.fetch(
      XMDHierarchyConfig.CHANNEL_ID
    );

    if (!channel || !channel.isTextBased()) {
      throw new Error(
        `XMD hierarchy channel ${XMDHierarchyConfig.CHANNEL_ID} was not found.`
      );
    }

    const textChannel = channel as TextChannel;

    await this.update(textChannel);

    console.log(
      "[XMD HIERARCHY] Initialization completed."
    );
  }

  /**
   * Schedule a hierarchy refresh.
   *
   * Multiple role changes happening quickly will result
   * in one refresh instead of many Discord API requests.
   */
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

  /**
   * Find the existing automatic hierarchy message.
   */
  private async findHierarchyMessage(
    channel: TextChannel
  ) {
    const messages = await channel.messages.fetch({
      limit: 100,
    });

    return messages.find((message) => {
      if (message.author.id !== channel.client.user?.id) {
        return false;
      }

      return message.embeds.some(
        (embed) =>
          embed.footer?.text ===
          XMDHierarchyConfig.FOOTER_IDENTIFIER
      );
    });
  }

  /**
   * Create or update the hierarchy message.
   */
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

      const existingMessage =
        await this.findHierarchyMessage(channel);

      if (existingMessage) {
        await existingMessage.edit({
          embeds: [embed],
        });

        console.log(
          `[XMD HIERARCHY] Updated message ${existingMessage.id}`
        );

        return;
      }

      const newMessage = await channel.send({
        embeds: [embed],
      });

      console.log(
        `[XMD HIERARCHY] Created message ${newMessage.id}`
      );
    } finally {
      this.updating = false;
    }
  }

  /**
   * Build the hierarchy embed.
   */
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
        name: `${role.name}`,
        value: memberList,
        inline: false,
      });
    }

    return embed;
  }
}

export const xmdHierarchyService =
  new XMDHierarchyService();