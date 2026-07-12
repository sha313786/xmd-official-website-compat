import { ButtonInteraction, MessageFlags } from "discord.js";

import { dutyService } from "../services/duty.service";

export default {
  async execute(interaction: ButtonInteraction) {
    try {
      await dutyService.startDuty(interaction.user.id);

      await interaction.reply({
        content: "✅ You are now **On Duty**.",
        flags: MessageFlags.Ephemeral,
      });
    } catch (error: any) {
      await interaction.reply({
        content:
          error?.message ??
          "Failed to start your duty.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};