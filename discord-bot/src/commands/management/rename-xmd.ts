import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("rename-xmd")
  .setDescription("Change [XMD] nicknames to XMD |")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ This command can only be used inside a server.",
      ephemeral: true,
    });
  }

  await interaction.deferReply({ ephemeral: true });

  await interaction.guild.members.fetch();

  let changed = 0;
  let skipped = 0;

  for (const member of interaction.guild.members.cache.values()) {
    const nickname = member.nickname;

    if (!nickname || !nickname.startsWith("[XMD]")) {
      continue;
    }

    const newNickname = `XMD |${nickname.slice(5)}`.trim();

    try {
      await member.setNickname(newNickname);
      changed++;
    } catch {
      skipped++;
    }
  }

  await interaction.editReply(
    `✅ **XMD Nickname Migration Complete**\n\n` +
    `Changed: **${changed}**\n` +
    `Skipped: **${skipped}**`
  );
}