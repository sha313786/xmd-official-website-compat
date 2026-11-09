"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonResponse = void 0;
const discord_js_1 = require("discord.js");
class ButtonResponse {
    /**
     * Safely defers the reply as ephemeral if not already acknowledged.
     */
    static async defer(interaction) {
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ flags: discord_js_1.MessageFlags.Ephemeral });
        }
    }
    /**
     * Edits the deferred ephemeral message with the result.
     */
    static async edit(interaction, message) {
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({
                content: message,
            });
        }
        else {
            await interaction.reply({
                content: message,
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
        }
    }
}
exports.ButtonResponse = ButtonResponse;
