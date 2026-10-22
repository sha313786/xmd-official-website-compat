import { Events, Interaction } from "discord.js";
import { recordLiveLog } from "../index";

export default {
  name: Events.InteractionCreate,

  once: false,

  async execute(interaction: Interaction) {
    // Slash Commands
    if (interaction.isChatInputCommand()) {
      recordLiveLog(`[COMMAND RECEIVED] /${interaction.commandName} by ${interaction.user.tag} (${interaction.user.id}) in guild ${interaction.guild?.name || 'DM'}`);
      console.log("Interaction:", interaction.commandName);

      const command = interaction.client.commands.get(
        interaction.commandName
      );

      console.log("Command found:", !!command);

      if (!command) {
        recordLiveLog(`[COMMAND NOT FOUND] /${interaction.commandName}`);
        return;
      }

      try {
        await command.execute(interaction);
        recordLiveLog(`[COMMAND SUCCESS] /${interaction.commandName} handled`);
      } catch (error: any) {
        recordLiveLog(`[COMMAND ERROR] /${interaction.commandName}: ${error?.message || String(error)}`);
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
      recordLiveLog(`[BUTTON RECEIVED] CustomId: "${interaction.customId}" by ${interaction.user.tag} (${interaction.user.id}) in guild ${interaction.guild?.name || 'DM'}`);
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
          recordLiveLog(`[BUTTON NOT FOUND] No module for customId "${interaction.customId}"`);
          console.warn(`[BUTTON] Unknown button clicked: ${interaction.customId}`);
          await interaction.reply({
            content: `⚠️ Unknown button: \`${interaction.customId}\``,
            ephemeral: true,
          });
          return;
        }

        await button.execute(interaction);
        recordLiveLog(`[BUTTON SUCCESS] CustomId "${interaction.customId}" handled`);
      } catch (error: any) {
        recordLiveLog(`[BUTTON ERROR] CustomId "${interaction.customId}": ${error?.message || String(error)}`);
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
