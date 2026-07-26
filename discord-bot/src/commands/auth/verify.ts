import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { AuthService } from "../../services/auth.service";

class VerifyCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Generate a website verification code");

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const code = await AuthService.createVerification(
      interaction.user
    );

    await this.success(
      interaction,
      [
        "## XMD Website Verification",
        "",
        `Your verification code is: **${code}**`,
        "",
        "This code expires in **10 minutes**.",
        "Use it on the XMD Management Portal to link your Discord account.",
      ].join("\n")
    );
  }
}

export default new VerifyCommand();