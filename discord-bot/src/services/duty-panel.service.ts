import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  Client,
  EmbedBuilder,
  TextChannel,
} from "discord.js";

import { botSettingsService } from "./bot-settings.service";
import { Logger } from "../config/logger";

export class DutyPanelService {
  static async initialize(
    client: Client
  ): Promise<boolean> {
    Logger.info("Restoring duty panel...");

    const channelId = await botSettingsService.get(
      "duty_panel_channel_id"
    );

    const messageId = await botSettingsService.get(
      "duty_panel_message_id"
    );

    if (!channelId || !messageId) {
      Logger.info(
        "Duty panel has not been configured yet."
      );
      return false;
    }

    try {
      const channel = await client.channels.fetch(
        channelId
      );

      if (
        !channel ||
        channel.type !== ChannelType.GuildText
      ) {
        throw new Error("Channel not found.");
      }

      const textChannel = channel as TextChannel;

      const message =
        await textChannel.messages.fetch(messageId);

      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("🏥 XMD DUTY PANEL")
        .setDescription(
          [
            "Welcome to the **XMD Duty System**.",
            "",
            "Use the buttons below to start or end your duty.",
            "",
            "• Verified XMD members only",
            "• One active duty session per member",
            "• Live dashboard updates automatically",
          ].join("\n")
        )
        .setFooter({
          text: "XMD Management Portal",
        })
        .setTimestamp();

      await message.edit({
        embeds: [embed],
        components: [this.createButtons()],
      });

      Logger.success(
        "Duty panel restored successfully."
      );

      return true;
    } catch (error) {
      Logger.warn(
        "Duty panel no longer exists. Clearing saved configuration."
      );

      await botSettingsService.set(
        "duty_panel_channel_id",
        ""
      );

      await botSettingsService.set(
        "duty_panel_message_id",
        ""
      );

      return false;
    }
  }

  static createButtons() {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("duty_on")
        .setLabel("On Duty")
        .setStyle(ButtonStyle.Success)
        .setEmoji("🟢"),

      new ButtonBuilder()
        .setCustomId("duty_off")
        .setLabel("Off Duty")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("🔴")
    );
  }
}

export const dutyPanelService = DutyPanelService;