"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_controller_1 = require("../../core/command/command.controller");
class RenameXMDCommand extends command_controller_1.CommandController {
    data = new discord_js_1.SlashCommandBuilder()
        .setName("rename-xmd")
        .setDescription("Change [XMD] nicknames to XMD |")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageNicknames);
    async run(interaction) {
        if (!interaction.guild) {
            await this.failure(interaction, "❌ This command can only be used inside a server.");
            return;
        }
        await interaction.guild.members.fetch();
        let changed = 0;
        let skipped = 0;
        for (const member of interaction.guild.members.cache.values()) {
            const nickname = member.nickname;
            if (!nickname || !nickname.startsWith("[XMD]")) {
                continue;
            }
            const name = nickname.slice("[XMD]".length).trim();
            const newNickname = `XMD | ${name}`;
            try {
                await member.setNickname(newNickname);
                changed++;
            }
            catch (error) {
                skipped++;
            }
        }
        await this.success(interaction, [
            "✅ **XMD Nickname Migration Complete**",
            "",
            `Changed: **${changed}**`,
            `Skipped: **${skipped}**`,
        ].join("\n"));
    }
}
exports.default = new RenameXMDCommand();
