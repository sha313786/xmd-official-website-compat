import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { SlashCommand } from "../../types/command";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say anything by the name of bot")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send")
        .setRequired(true)
    ),

  async execute(
    interaction: ChatInputCommandInteraction
  ) {
    const message = interaction.options.getString(
      "message",
      true
    );

    await interaction.reply({
      content: message,
      ephemeral: true,
      allowedMentions: {
        parse: [],
      },
    });
  },
};

export default command;