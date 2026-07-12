import { Events, Interaction } from "discord.js";

export default {
  name: Events.InteractionCreate,

  once: false,

  async execute(interaction: Interaction) {
    // Slash Commands
    if (interaction.isChatInputCommand()) {
      console.log("Interaction:", interaction.commandName);

      const command = interaction.client.commands.get(
        interaction.commandName
      );

      console.log("Command found:", !!command);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content:
              "An error occurred while executing this command.",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              "An error occurred while executing this command.",
            ephemeral: true,
          });
        }
      }

      return;
    }

    // Buttons
    if (interaction.isButton()) {
      try {
        const button = require(
          `../buttons/${interaction.customId}`
        ).default;

        if (!button) return;

        await button.execute(interaction);
      } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content:
              "An error occurred while processing this button.",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              "An error occurred while processing this button.",
            ephemeral: true,
          });
        }
      }

      return;
    }
  },
};