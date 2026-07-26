import { ChatInputCommandInteraction } from "discord.js";

import { CommandResponse } from "./command.response";
import { CommandError } from "./command.error";

export abstract class CommandController {
  /**
   * Entry point for all slash commands.
   */
  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await CommandResponse.defer(interaction);

    try {
      await this.run(interaction);
    } catch (error) {
      await this.failure(interaction, error);
    }
  }

  /**
   * Business logic implemented by child classes.
   */
  protected abstract run(
    interaction: ChatInputCommandInteraction
  ): Promise<void>;

  /**
   * Success response.
   */
  protected async success(
    interaction: ChatInputCommandInteraction,
    message: string
  ): Promise<void> {
    await CommandResponse.edit(interaction, message);
  }

  /**
   * Failure response.
   */
  protected async failure(
    interaction: ChatInputCommandInteraction,
    error: unknown
  ): Promise<void> {
    await CommandResponse.edit(
      interaction,
      CommandError.getMessage(error)
    );
  }
}