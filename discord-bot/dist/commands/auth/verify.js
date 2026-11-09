"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const auth_service_1 = require("../../services/auth.service");
const command = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("verify")
        .setDescription("Generate a website verification code"),
    async execute(interaction) {
        try {
            const code = await auth_service_1.AuthService.createVerification(interaction.user.id);
            await interaction.reply({
                ephemeral: true,
                content: [
                    "## XMD Website Verification",
                    "",
                    `Your verification code is: **${code}**`,
                    "",
                    "This code expires in **10 minutes**.",
                    "Use it on the XMD Management Portal to link your Discord account.",
                ].join("\n"),
            });
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                ephemeral: true,
                content: "❌ Failed to generate a verification code. Please try again later.",
            });
        }
    },
};
exports.default = command;
