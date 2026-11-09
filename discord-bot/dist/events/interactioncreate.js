"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            await this.handleCommand(interaction);
            return;
        }
        if (interaction.isButton()) {
            await this.handleButton(interaction);
        }
    },
    async handleCommand(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            await this.replyError(interaction, "Unknown command.");
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error("========== COMMAND ERROR ==========");
            console.error(error);
            console.error("===================================");
            await this.replyError(interaction, "An error occurred while executing this command.");
        }
    },
    async handleButton(interaction) {
        console.log("========== BUTTON ==========");
        console.log("Custom ID:", interaction.customId);
        let button;
        try {
            const module = await import(`../buttons/${interaction.customId}.js`);
            console.log("Module Loaded:", module);
            button = (module.default?.default ??
                module.default ??
                module);
            console.log("Button:", button);
        }
        catch (error) {
            console.error("========== BUTTON IMPORT ERROR ==========");
            console.error(error);
            console.error("=========================================");
            await this.replyError(interaction, "Unknown button.");
            return;
        }
        try {
            await button.execute(interaction);
        }
        catch (error) {
            console.error("========== BUTTON EXECUTION ERROR ==========");
            console.error(error);
            console.error("============================================");
            await this.replyError(interaction, "An error occurred while processing this button.");
        }
    },
    async replyError(interaction, message) {
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: message,
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
            return;
        }
        await interaction.reply({
            content: message,
            flags: discord_js_1.MessageFlags.Ephemeral,
        });
    },
};
