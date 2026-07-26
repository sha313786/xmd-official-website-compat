import { ButtonInteraction } from "discord.js";
import { ButtonController } from "../core/button/button.controller";
import { dutyService } from "../services/duty.service";

class DutyOffButton extends ButtonController {
  protected async run(interaction: ButtonInteraction): Promise<void> {
    console.log("================================");
    console.log("[DUTY OFF] Button Clicked");
    console.log("[DUTY OFF] User:", interaction.user.id);

    console.log("[DUTY OFF] Calling dutyService.endDuty()...");

    const session = await dutyService.endDuty(interaction.user.id);

    console.log("[DUTY OFF] Duty Ended Successfully");
    console.log("[DUTY OFF] Session:", session);

    await this.success(
      interaction,
      "🔴 You are now **Off Duty**."
    );

    console.log("[DUTY OFF] Success Response Sent");
    console.log("================================");
  }
}

export default new DutyOffButton();