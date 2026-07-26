import { ButtonInteraction } from "discord.js";
import { ButtonResponse } from "./button.response";
import { ButtonError } from "./button.error";

export abstract class ButtonController {
  /**
   * Entry point for all button controllers.
   */
  public async execute(interaction: ButtonInteraction): Promise<void> {
    await ButtonResponse.defer(interaction);

    try {
      await this.run(interaction);
    } catch (error) {
      await this.failure(interaction, error);
    }
  }

  /**
   * Business logic implemented by child classes.
   */
  protected abstract run(interaction: ButtonInteraction): Promise<void>;

  /**
   * Success response.
   */
  protected async success(
    interaction: ButtonInteraction,
    message: string
  ): Promise<void> {
    await ButtonResponse.edit(interaction, message);
  }

  /**
   * Failure response.
   */
  protected async failure(
    interaction: ButtonInteraction,
    error: unknown
  ): Promise<void> {
    // Enhanced logging to print the exact crash details in PM2 logs
    console.error("================ BUTTON EXECUTION ERROR ================");
    console.error(error);
    console.error("========================================================");

    const errorMessage = ButtonError.getMessage(error);
    await ButtonResponse.edit(
      interaction,
      `❌ ${errorMessage}`
    );
  }
}