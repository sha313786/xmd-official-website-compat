import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { dutyService } from "../../services/duty.service";

class OffDutyCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("offduty")
    .setDescription("End your XMD duty.");

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const session = await dutyService.endDuty(
      interaction.user.id
    );

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