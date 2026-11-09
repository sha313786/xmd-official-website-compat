"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_controller_1 = require("../../core/command/command.controller");
const duty_service_1 = require("../../services/duty.service");
const duty_log_service_1 = require("../../services/duty-log.service");
class OffDutyCommand extends command_controller_1.CommandController {
    data = new discord_js_1.SlashCommandBuilder()
        .setName("offduty")
        .setDescription("End your XMD duty.");
    async run(interaction) {
        const session = await duty_service_1.dutyService.endDuty(interaction.user.id);
        try {
            const member = await duty_service_1.dutyService.getMember(interaction.user.id);
            await duty_log_service_1.dutyLogService.logOffDuty(interaction.client, interaction.user.id, session);
        }
        catch (error) {
            console.error("[OFF DUTY COMMAND] Failed to send Discord duty log:", error);
        }
        await this.success(interaction, [
            "🔴 Duty completed.",
            "",
            `Total Hours: ${session.duty_hours}`,
        ].join("\n"));
    }
}
exports.default = new OffDutyCommand();
