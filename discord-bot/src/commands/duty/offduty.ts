import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { DutyService } from "../../services/duty.service";

export default {
  data: new SlashCommandBuilder()
    .setName("offduty")
    .setDescription("End your XMD duty."),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const discordId = interaction.user.id;

      const session = await DutyService.endDuty(discordId);

      await interaction.editReply(
        `🔴 Duty completed.\n\nTotal Hours: ${session.duty_hours}`
      );
    } catch (error) {
      await interaction.editReply(
        error instanceof Error
          ? error.message
          : "Failed to end duty."
      );
    }
  },
};