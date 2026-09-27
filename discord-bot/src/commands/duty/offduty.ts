import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { dutyService } from "../../services/duty.service";
import { dutyLogService } from "../../services/duty-log.service";

class OffDutyCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("offduty")
    .setDescription("End your XMD duty.");

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const session =
      await dutyService.endDuty(
        interaction.user.id
      );

    try {
      const member =
        await dutyService.getMember(
          interaction.user.id
        );

      await dutyLogService.logOffDuty(
        interaction.client,
        interaction.user.id,
        session
      );
    } catch (error) {
      console.error(
        "[OFF DUTY COMMAND] Failed to send Discord duty log:",
        error
      );
    }

    await this.success(
      interaction,
      [
        "🔴 Duty completed.",
        "",
        `Total Hours: ${session.duty_hours}`,
      ].join("\n")
    );
  }
}

export default new OffDutyCommand();