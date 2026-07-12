import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { SlashCommand } from "../../types/command";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("🏓 Pong!");
  },
};

export default command;