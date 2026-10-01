import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";

class DmCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Send a direct message to multiple players.")

    // Required options FIRST
    .addUserOption((option) =>
      option
        .setName("player1")
        .setDescription("First player")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    )

    // Optional players AFTER required options
    .addUserOption((option) =>
      option
        .setName("player2")
        .setDescription("Second player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player3")
        .setDescription("Third player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player4")
        .setDescription("Fourth player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player5")
        .setDescription("Fifth player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player6")
        .setDescription("Sixth player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player7")
        .setDescription("Seventh player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player8")
        .setDescription("Eighth player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player9")
        .setDescription("Ninth player")
        .setRequired(false)
    )

    .addUserOption((option) =>
      option
        .setName("player10")
        .setDescription("Tenth player")
        .setRequired(false)
    );

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const message =
      interaction.options.getString(
        "message",
        true
      );

    const players = [];

    for (let i = 1; i <= 10; i++) {
      const player =
        interaction.options.getUser(
          `player${i}`
        );

      if (player) {
        players.push(player);
      }
    }

    let sent = 0;
    let failed = 0;

    for (const player of players) {
      try {
        await player.send({
          content: message,
          allowedMentions: {
            parse: [],
          },
        });

        sent++;

        console.log(
          `[DM] Sent to ${player.tag}`
        );
      } catch (error) {
        console.error(
          `[DM] Failed to DM ${player.tag}:`,
          error
        );

        failed++;
      }
    }

    await this.success(
      interaction,
      [
        `📨 **DM Result**`,
        ``,
        `✅ Sent: ${sent}`,
        `❌ Failed: ${failed}`,
        `👥 Total: ${players.length}`,
      ].join("\n")
    );
  }
}

export default new DmCommand();