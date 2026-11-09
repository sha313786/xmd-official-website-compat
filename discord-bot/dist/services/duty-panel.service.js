"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dutyPanelService = exports.DutyPanelService = void 0;
const discord_js_1 = require("discord.js");
const bot_settings_service_1 = require("./bot-settings.service");
const logger_1 = require("../config/logger");
class DutyPanelService {
    static async initialize(client) {
        logger_1.Logger.info("Restoring duty panel...");
        const channelId = await bot_settings_service_1.botSettingsService.get("duty_panel_channel_id");
        const messageId = await bot_settings_service_1.botSettingsService.get("duty_panel_message_id");
        if (!channelId || !messageId) {
            logger_1.Logger.info("Duty panel has not been configured yet.");
            return false;
        }
        try {
            const channel = await client.channels.fetch(channelId);
            if (!channel ||
                channel.type !== discord_js_1.ChannelType.GuildText) {
                throw new Error("Channel not found.");
            }
            const textChannel = channel;
            const message = await textChannel.messages.fetch(messageId);
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
            await message.edit({
                embeds: [embed],
                components: [this.createButtons()],
            });
            logger_1.Logger.success("Duty panel restored successfully.");
            return true;
        }
        catch (error) {
            logger_1.Logger.warn("Duty panel no longer exists. Clearing saved configuration.");
            await bot_settings_service_1.botSettingsService.set("duty_panel_channel_id", "");
            await bot_settings_service_1.botSettingsService.set("duty_panel_message_id", "");
            return false;
        }
    }
    static createButtons() {
        return new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId("duty_on")
            .setLabel("On Duty")
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setEmoji("🟢"), new discord_js_1.ButtonBuilder()
            .setCustomId("duty_off")
            .setLabel("Off Duty")
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setEmoji("🔴"));
    }
}
exports.DutyPanelService = DutyPanelService;
exports.dutyPanelService = DutyPanelService;
