import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { SlashCommand } from "../../types/command";
import { AuthService } from "../../services/auth.service";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Generate a website verification code"),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const code = await AuthService.createVerification(
        interaction.user
      );

      await interaction.reply({
        ephemeral: true,
        content: [
          "## XMD Website Verification",
          "",
          `Your verification code is: **${code}**`,
          "",
          "This code expires in **10 minutes**.",
          "Use it on the XMD Management Portal to link your Discord account.",
        ].join("\n"),
      });
    } catch (error) {
      console.error(error);

      await interaction.reply({
        ephemeral: true,
        content:
          "❌ Failed to generate a verification code. Please try again later.",
      });
    }
  },
};

export default command;