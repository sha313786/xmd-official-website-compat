import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { dutyService } from "../../services/duty.service";

class OnDutyCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("onduty")
    .setDescription("Start your XMD duty.");

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await dutyService.startDuty(interaction.user.id);

    await this.success(
      interaction,
      "🟢 You are now **On Duty**."
    );
  }
}

export default new OnDutyCommand();