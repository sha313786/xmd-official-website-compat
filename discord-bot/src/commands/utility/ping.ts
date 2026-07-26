import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";

class PingCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await this.success(
      interaction,
      "🏓 Pong!"
    );
  }
}

export default new PingCommand();