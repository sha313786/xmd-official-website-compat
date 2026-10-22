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
        let buttonModule: any;
        try {
          buttonModule = require(`../buttons/${interaction.customId}`);
        } catch {
          buttonModule = await import(`../buttons/${interaction.customId}`);
        }

        const button =
          buttonModule?.default?.default ??
          buttonModule?.default ??
          buttonModule;

        if (!button) {
          console.warn(`[BUTTON] Unknown button clicked: ${interaction.customId}`);
          return;
        }

        await button.execute(interaction);
      } catch (error) {
        console.error(`[BUTTON ERROR] Failed executing button ${interaction.customId}:`, error);

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
