"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("say")
        .setDescription("Say anything by the name of bot")
        .addStringOption((option) => option
        .setName("message")
        .setDescription("The message to send")
        .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString("message", true);
        await interaction.reply({
            content: message,
            ephemeral: true,
            allowedMentions: {
                parse: [],
            },
        });
    },
};
exports.default = command;
