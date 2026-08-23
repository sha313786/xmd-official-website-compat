import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";

class RenameXMDCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("rename-xmd")
    .setDescription("Change [XMD] nicknames to XMD |")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageNicknames
    );

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    if (!interaction.guild) {
      await this.failure(
        interaction,
        "❌ This command can only be used inside a server."
      );
      return;
    }

    await interaction.guild.members.fetch();

    let changed = 0;
    let skipped = 0;

    for (const member of interaction.guild.members.cache.values()) {
      const nickname = member.nickname;

      if (!nickname || !nickname.startsWith("[XMD]")) {
        continue;
      }

      const name = nickname.slice("[XMD]".length).trim();
      const newNickname = `XMD | ${name}`;

      try {
        await member.setNickname(newNickname);
        changed++;
      } catch (error) {
        skipped++;
      }
    }

    await this.success(
      interaction,
      [
        "✅ **XMD Nickname Migration Complete**",
        "",
        `Changed: **${changed}**`,
        `Skipped: **${skipped}**`,
      ].join("\n")
    );
  }
}

export default new RenameXMDCommand();