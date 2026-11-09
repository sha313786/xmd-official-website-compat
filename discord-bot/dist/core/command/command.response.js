"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandResponse = void 0;
const discord_js_1 = require("discord.js");
class CommandResponse {
    static async defer(interaction) {
        await interaction.deferReply({
            flags: discord_js_1.MessageFlags.Ephemeral,
        });
    }
    static async reply(interaction, options) {
        await interaction.reply(options);
    }
    static async edit(interaction, content) {
        await interaction.editReply({
            content,
        });
    }
}
exports.CommandResponse = CommandResponse;
