"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_controller_1 = require("../core/button/button.controller");
const duty_service_1 = require("../services/duty.service");
const duty_log_service_1 = require("../services/duty-log.service");
class DutyOffButton extends button_controller_1.ButtonController {
    async run(interaction) {
        console.log("================================");
        console.log("[DUTY OFF] Button Clicked");
        console.log("[DUTY OFF] User:", interaction.user.id);
        console.log("[DUTY OFF] Calling dutyService.endDuty()...");
        const session = await duty_service_1.dutyService.endDuty(interaction.user.id);
        console.log("[DUTY OFF] Duty Ended Successfully");
        console.log("[DUTY OFF] Session:", session);
        // Send Discord duty log.
        // Failure here does not affect the database duty record.
        try {
            console.log("[DUTY OFF] Sending Discord duty log...");
            await duty_log_service_1.dutyLogService.logOffDuty(interaction.client, interaction.user.id, session);
            console.log("[DUTY OFF] Discord duty log sent successfully.");
        }
        catch (error) {
            console.error("[DUTY OFF] Failed to send Discord duty log:", error);
        }
        await this.success(interaction, "🔴 You are now **Off Duty**.");
        console.log("[DUTY OFF] Success Response Sent");
        console.log("================================");
    }
}
exports.default = new DutyOffButton();
