import { ButtonInteraction } from "discord.js";
import { ButtonController } from "../core/button/button.controller";
import { dutyService } from "../services/duty.service";

class DutyOnButton extends ButtonController {
  protected async run(interaction: ButtonInteraction): Promise<void> {
    console.log("================================");
    console.log("[DUTY ON] Button Clicked");
    console.log("[DUTY ON] User:", interaction.user.id);

    console.log("[DUTY ON] Calling dutyService.startDuty()...");

    // If dutyService expects interaction or userId, ensure it matches your service signature
    const session = await dutyService.startDuty(interaction.user.id);

    console.log("[DUTY ON] Duty Started Successfully");
    console.log("[DUTY ON] Session:", session);

    await this.success(
      interaction,
      "✅ You are now **On Duty**."
    );

    console.log("[DUTY ON] Success Response Sent");
    console.log("================================");
  }
}

export default new DutyOnButton();