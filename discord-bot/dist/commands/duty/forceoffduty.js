"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_controller_1 = require("../../core/command/command.controller");
const permission_1 = require("../../config/permission");
const duty_service_1 = require("../../services/duty.service");
const member_service_1 = require("../../services/member.service");
class ForceOffDutyCommand extends command_controller_1.CommandController {
    data = new discord_js_1.SlashCommandBuilder()
        .setName("forceoffduty")
        .setDescription("Force an XMD member off duty.")
        .addUserOption((option) => option
        .setName("member")
        .setDescription("XMD member to remove from duty")
        .setRequired(true));
    async run(interaction) {
        if (!interaction.guild) {
            throw new Error("This command can only be used inside the XMD server.");
        }
        const managementMember = interaction.guild.members.cache.get(interaction.user.id);
        if (!managementMember) {
            throw new Error("Unable to verify your XMD management role.");
        }
        const hasManagementRole = managementMember.roles.cache.some((role) => permission_1.PermissionsConfig.MANAGEMENT_ROLES.includes(role.name));
        const hasAdminPermission = managementMember.permissions.has("Administrator");
        if (!hasManagementRole && !hasAdminPermission) {
            throw new Error("You do not have permission to force a member off duty.");
        }
        const targetUser = interaction.options.getUser("member", true);
        const targetMember = await member_service_1.MemberService.getByDiscordId(targetUser.id);
        const session = await duty_service_1.dutyService.endDutyForMember(targetMember.id);
        await this.success(interaction, [
            "🔴 **Force Off Duty completed.**",
            "",
            `Member: **${targetMember.full_name}**`,
            `Badge: **${targetMember.badge_number}**`,
            `Total Hours: **${session.duty_hours}**`,
        ].join("\n"));
    }
}
exports.default = new ForceOffDutyCommand();
