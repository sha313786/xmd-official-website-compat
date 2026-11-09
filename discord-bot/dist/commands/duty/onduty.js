"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_controller_1 = require("../../core/command/command.controller");
const duty_service_1 = require("../../services/duty.service");
const duty_log_service_1 = require("../../services/duty-log.service");
class OnDutyCommand extends command_controller_1.CommandController {
    data = new discord_js_1.SlashCommandBuilder()
        .setName("onduty")
        .setDescription("Start your XMD duty.");
    async run(interaction) {
        const session = await duty_service_1.dutyService.startDuty(interaction.user.id);
        try {
            const member = await duty_service_1.dutyService.getMember(interaction.user.id);
            await duty_log_service_1.dutyLogService.logOnDuty(interaction.client, interaction.user.id, session);
        }
        catch (error) {
            console.error("[ON DUTY COMMAND] Failed to send Discord duty log:", error);
        }
        await this.success(interaction, "🟢 You are now **On Duty**.");
    }
}
exports.default = new OnDutyCommand();
