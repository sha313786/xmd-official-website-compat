import { ButtonInteraction } from "discord.js";

import { ButtonController } from "../core/button/button.controller";
import { dutyService } from "../services/duty.service";
import { dutyLogService } from "../services/duty-log.service";

class DutyOffButton extends ButtonController {
  protected async run(
    interaction: ButtonInteraction
  ): Promise<void> {
    console.log("================================");
    console.log("[DUTY OFF] Button Clicked");
    console.log("[DUTY OFF] User:", interaction.user.id);

    console.log(
      "[DUTY OFF] Calling dutyService.endDuty()..."
    );

    const session =
      await dutyService.endDuty(
        interaction.user.id
      );

    console.log(
      "[DUTY OFF] Duty Ended Successfully"
    );
    console.log(
      "[DUTY OFF] Session:",
      session
    );

    // Send Discord duty log.
    // Failure here does not affect the database duty record.
    try {
      console.log(
        "[DUTY OFF] Sending Discord duty log..."
      );

      await dutyLogService.logOffDuty(
        interaction.client,
        interaction.user.id,
        session
      );

      console.log(
        "[DUTY OFF] Discord duty log sent successfully."
      );
    } catch (error) {
      console.error(
        "[DUTY OFF] Failed to send Discord duty log:",
        error
      );
    }

    await this.success(
      interaction,
      "🔴 You are now **Off Duty**."
    );

    console.log(
      "[DUTY OFF] Success Response Sent"
    );
    console.log("================================");
  }
}

export default new DutyOffButton();