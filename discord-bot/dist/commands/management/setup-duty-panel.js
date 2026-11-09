"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bot_settings_service_1 = require("../../services/bot-settings.service");
const duty_panel_service_1 = require("../../services/duty-panel.service");
const command = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("setup-duty-panel")
        .setDescription("Create or recreate the XMD Duty Panel.")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addChannelOption(option => option
        .setName("channel")
        .setDescription("Duty panel channel")
        .addChannelTypes(discord_js_1.ChannelType.GuildText)
        .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel", true);
        const oldChannelId = await bot_settings_service_1.botSettingsService.get("duty_panel_channel_id");
        const oldMessageId = await bot_settings_service_1.botSettingsService.get("duty_panel_message_id");
        if (oldChannelId && oldMessageId) {
            try {
                const oldChannel = await interaction.client.channels.fetch(oldChannelId);
                if (oldChannel &&
                    oldChannel.type === discord_js_1.ChannelType.GuildText) {
                    const oldMessage = await oldChannel.messages.fetch(oldMessageId);
                    await oldMessage.delete();
                }
            }
            catch {
                // Ignore if the previous panel no longer exists.
            }
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0xff0000)
            .setTitle("🏥 XMD DUTY PANEL")
            .setDescription([
            "Welcome to the **XMD Duty System**.",
            "",
            "Use the buttons below to start or end your duty.",
            "",
            "• Verified XMD members only",
            "• One active duty session per member",
            "• Live dashboard updates automatically",
        ].join("\n"))
            .setFooter({
            text: "XMD Management Portal",
        })
            .setTimestamp();
        const message = await channel.send({
            embeds: [embed],
            components: [duty_panel_service_1.dutyPanelService.createButtons()],
        });
        await bot_settings_service_1.botSettingsService.set("duty_panel_channel_id", channel.id);
        await bot_settings_service_1.botSettingsService.set("duty_panel_message_id", message.id);
        await interaction.reply({
            content: "✅ Duty panel has been created successfully.",
            ephemeral: true,
        });
    },
};
exports.default = command;
