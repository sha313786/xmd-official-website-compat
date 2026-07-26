import { ButtonInteraction, MessageFlags } from "discord.js";

export class ButtonResponse {
  /**
   * Safely defers the reply as ephemeral if not already acknowledged.
   */
  static async defer(interaction: ButtonInteraction): Promise<void> {
    if (!interaction.deferred && !interaction.replied) {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    }
  }

  /**
   * Edits the deferred ephemeral message with the result.
   */
  static async edit(
    interaction: ButtonInteraction,
    message: string
  ): Promise<void> {
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({
        content: message,
      });
    } else {
      await interaction.reply({
        content: message,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
