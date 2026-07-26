import {
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";

import { CommandController } from "../../core/command/command.controller";
import { botSettingsService } from "../../services/bot-settings.service";

class SetupDutyPanelCommand extends CommandController {
  public readonly data = new SlashCommandBuilder()
    .setName("setup-duty-panel")
    .setDescription("Create or recreate the XMD Duty Panel.")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    )
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Duty panel channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    );

  protected async run(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const channel = interaction.options.getChannel(
      "channel",
      true
    ) as TextChannel;

    const oldChannelId = await botSettingsService.get(
      "duty_panel_channel_id"
    );

    const oldMessageId = await botSettingsService.get(
      "duty_panel_message_id"
    );

    // Phase 8 will implement panel creation and replacement.
    await this.success(
      interaction,
      [
        "✅ Duty panel setup initialized.",
        "",
        `Target Channel: ${channel}`,
        `Previous Channel ID: ${oldChannelId ?? "None"}`,
        `Previous Message ID: ${oldMessageId ?? "None"}`,
      ].join("\n")
    );
  }
}

export default new SetupDutyPanelCommand();