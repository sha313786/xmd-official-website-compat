import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { DutyService } from "../../services/duty.service";

export default {
  data: new SlashCommandBuilder()
    .setName("onduty")
    .setDescription("Start your XMD duty."),

  async execute(interaction: ChatInputCommandInteraction) {
  console.log("Executing onduty command");

  await interaction.deferReply({ ephemeral: true });

    try {
      const discordId = interaction.user.id;

      await DutyService.startDuty(discordId);

      await interaction.editReply("🟢 You are now On Duty.");
    } catch (error) {
      await interaction.editReply(
        error instanceof Error
          ? error.message
          : "Failed to start duty."
      );
    }
  },
};