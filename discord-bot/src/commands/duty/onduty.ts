import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { dutyService } from "../../services/duty.service";
import { dutyLogService } from "../../services/duty-log.service";

class OnDutyCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("onduty")
    .setDescription("Start your XMD duty.");

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const session =
      await dutyService.startDuty(
        interaction.user.id
      );

    try {
      const member =
        await dutyService.getMember(
          interaction.user.id
        );

      await dutyLogService.logOnDuty(
        interaction.client,
        interaction.user.id,
        session
      );
    } catch (error) {
      console.error(
        "[ON DUTY COMMAND] Failed to send Discord duty log:",
        error
      );
    }

    await this.success(
      interaction,
      "🟢 You are now **On Duty**."
    );
  }
}

export default new OnDutyCommand();