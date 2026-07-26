import {
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  MessageFlags,
} from "discord.js";

export class CommandResponse {
  public static async defer(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });
  }

  public static async reply(
    interaction: ChatInputCommandInteraction,
    options: InteractionReplyOptions
  ): Promise<void> {
    await interaction.reply(options);
  }

  public static async edit(
    interaction: ChatInputCommandInteraction,
    content: string
  ): Promise<void> {
    await interaction.editReply({
      content,
    });
  }
}