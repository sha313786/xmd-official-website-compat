import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";

import { SlashCommand } from "../../types/command";
import { botSettingsService } from "../../services/bot-settings.service";
import { dutyPanelService } from "../../services/duty-panel.service";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("setup-duty-panel")
    .setDescription("Create or recreate the XMD Duty Panel.")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    )
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Duty panel channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel(
      "channel",
      true
    ) as TextChannel;

    const oldChannelId = await botSettingsService.get(
      "duty_panel_channel_id"
    );

    const oldMessageId = await botSettingsService.get(
      "duty_panel_message_id"
    );

    if (oldChannelId && oldMessageId) {
      try {
        const oldChannel =
          await interaction.client.channels.fetch(
            oldChannelId
          );

        if (
          oldChannel &&
          oldChannel.type === ChannelType.GuildText
        ) {
          const oldMessage = await (
            oldChannel as TextChannel
          ).messages.fetch(oldMessageId);

          await oldMessage.delete();
        }
      } catch {
        // Ignore if the previous panel no longer exists.
      }
    }

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

    const message = await channel.send({
      embeds: [embed],
      components: [dutyPanelService.createButtons()],
    });

    await botSettingsService.set(
      "duty_panel_channel_id",
      channel.id
    );

    await botSettingsService.set(
      "duty_panel_message_id",
      message.id
    );

    await interaction.reply({
      content:
        "✅ Duty panel has been created successfully.",
      ephemeral: true,
    });
  },
};

export default command;