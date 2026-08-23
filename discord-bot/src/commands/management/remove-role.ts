import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  Role,
  SlashCommandBuilder,
  User,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";

class RemoveRoleCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("remove-role")
    .setDescription("Remove a role from a member.")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageRoles
    )
    .addUserOption(option =>
      option
        .setName("member")
        .setDescription("Member to remove the role from.")
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName("role")
        .setDescription("Role to remove.")
        .setRequired(true)
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

    const user = interaction.options.getUser(
      "member",
      true
    );

    const role = interaction.options.getRole(
      "role",
      true
    ) as Role;

    const member = await interaction.guild.members.fetch(
      user.id
    );

    if (!member.roles.cache.has(role.id)) {
      await this.failure(
        interaction,
        `❌ ${member} does not have the **${role.name}** role.`
      );
      return;
    }

    if (
      role.managed ||
      role.position >= interaction.guild.members.me!.roles.highest.position
    ) {
      await this.failure(
        interaction,
        `❌ I cannot remove the **${role.name}** role because of Discord's role hierarchy.`
      );
      return;
    }

    try {
      await member.roles.remove(
        role,
        `Role removed by ${interaction.user.tag}`
      );

      await this.success(
        interaction,
        [
          "✅ **Role Removed**",
          "",
          `Member: ${member}`,
          `Role: **${role.name}**`,
        ].join("\n")
      );
    } catch (error) {
      await this.failure(
        interaction,
        "❌ Failed to remove the role."
      );

      throw error;
    }
  }
}

export default new RemoveRoleCommand();