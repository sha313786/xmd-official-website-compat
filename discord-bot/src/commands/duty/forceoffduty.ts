import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { PermissionsConfig } from "../../config/permission";
import { dutyService } from "../../services/duty.service";
import { MemberService } from "../../services/member.service";

class ForceOffDutyCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("forceoffduty")
    .setDescription("Force an XMD member off duty.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("XMD member to remove from duty")
        .setRequired(true)
    );

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    if (!interaction.guild) {
      throw new Error("This command can only be used inside the XMD server.");
    }

    const managementMember = interaction.guild.members.cache.get(
      interaction.user.id
    );

    if (!managementMember) {
      throw new Error("Unable to verify your XMD management role.");
    }

    const hasManagementRole = managementMember.roles.cache.some((role) =>
      PermissionsConfig.MANAGEMENT_ROLES.includes(
        role.name as (typeof PermissionsConfig.MANAGEMENT_ROLES)[number]
      )
    );

    const hasAdminPermission = managementMember.permissions.has(
      "Administrator"
    );

    if (!hasManagementRole && !hasAdminPermission) {
      throw new Error(
        "You do not have permission to force a member off duty."
      );
    }

    const targetUser = interaction.options.getUser("member", true);

    const targetMember = await MemberService.getByDiscordId(targetUser.id);

    const session = await dutyService.endDutyForMember(targetMember.id);

    await this.success(
      interaction,
      [
        "🔴 **Force Off Duty completed.**",
        "",
        `Member: **${targetMember.full_name}**`,
        `Badge: **${targetMember.badge_number}**`,
        `Total Hours: **${session.duty_hours}**`,
      ].join("\n")
    );
  }
}

export default new ForceOffDutyCommand();
