import { ButtonInteraction } from "discord.js";

import { ButtonController } from "../core/button/button.controller";
import { dutyService } from "../services/duty.service";
import { dutyLogService } from "../services/duty-log.service";

class DutyOnButton extends ButtonController {
  protected async run(
    interaction: ButtonInteraction
  ): Promise<void> {
    console.log("================================");
    console.log("[DUTY ON] Button Clicked");
    console.log("[DUTY ON] User:", interaction.user.id);

    console.log(
      "[DUTY ON] Calling dutyService.startDuty()..."
    );

    const session =
      await dutyService.startDuty(
        interaction.user.id
      );

    console.log(
      "[DUTY ON] Duty Started Successfully"
    );
    console.log(
      "[DUTY ON] Session:",
      session
    );

    // Send Discord duty log.
    // Failure here does not affect the database duty record.
    try {
      console.log(
        "[DUTY ON] Sending Discord duty log..."
      );

      await dutyLogService.logOnDuty(
        interaction.client,
        interaction.user.id,
        session
      );

      console.log(
        "[DUTY ON] Discord duty log sent successfully."
      );
    } catch (error) {
      console.error(
        "[DUTY ON] Failed to send Discord duty log:",
        error
      );
    }

    await this.success(
      interaction,
      "✅ You are now **On Duty**."
    );

    console.log(
      "[DUTY ON] Success Response Sent"
    );
    console.log("================================");
  }
}

export default new DutyOnButton();