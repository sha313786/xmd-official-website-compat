"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const live_logger_1 = require("../utils/live-logger");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        // Slash Commands
        if (interaction.isChatInputCommand()) {
            (0, live_logger_1.recordLiveLog)(`[COMMAND RECEIVED] /${interaction.commandName} by ${interaction.user.tag} (${interaction.user.id}) in guild ${interaction.guild?.name || 'DM'}`);
            console.log("Interaction:", interaction.commandName);
            const command = interaction.client.commands.get(interaction.commandName);
            console.log("Command found:", !!command);
            if (!command) {
                (0, live_logger_1.recordLiveLog)(`[COMMAND NOT FOUND] /${interaction.commandName}`);
                return;
            }
            try {
                await command.execute(interaction);
                (0, live_logger_1.recordLiveLog)(`[COMMAND SUCCESS] /${interaction.commandName} handled`);
            }
            catch (error) {
                (0, live_logger_1.recordLiveLog)(`[COMMAND ERROR] /${interaction.commandName}: ${error?.message || String(error)}`);
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: "An error occurred while executing this command.",
                        ephemeral: true,
                    });
                }
                else {
                    await interaction.reply({
                        content: "An error occurred while executing this command.",
                        ephemeral: true,
                    });
                }
            }
            return;
        }
        // Buttons
        if (interaction.isButton()) {
            (0, live_logger_1.recordLiveLog)(`[BUTTON RECEIVED] CustomId: "${interaction.customId}" by ${interaction.user.tag} (${interaction.user.id}) in guild ${interaction.guild?.name || 'DM'}`);
            try {
                let buttonModule;
                try {
                    buttonModule = require(`../buttons/${interaction.customId}`);
                }
                catch {
                    buttonModule = await import(`../buttons/${interaction.customId}`);
                }
                const button = buttonModule?.default?.default ??
                    buttonModule?.default ??
                    buttonModule;
                if (!button) {
                    (0, live_logger_1.recordLiveLog)(`[BUTTON NOT FOUND] No module for customId "${interaction.customId}"`);
                    console.warn(`[BUTTON] Unknown button clicked: ${interaction.customId}`);
                    await interaction.reply({
                        content: `⚠️ Unknown button: \`${interaction.customId}\``,
                        ephemeral: true,
                    });
                    return;
                }
                await button.execute(interaction);
                (0, live_logger_1.recordLiveLog)(`[BUTTON SUCCESS] CustomId "${interaction.customId}" handled`);
            }
            catch (error) {
                (0, live_logger_1.recordLiveLog)(`[BUTTON ERROR] CustomId "${interaction.customId}": ${error?.message || String(error)}`);
                console.error(`[BUTTON ERROR] Failed executing button ${interaction.customId}:`, error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: "An error occurred while processing this button.",
                        ephemeral: true,
                    });
                }
                else {
                    await interaction.reply({
                        content: "An error occurred while processing this button.",
                        ephemeral: true,
                    });
                }
            }
            return;
        }
    },
};
