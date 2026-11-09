"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusDashboardService = exports.StatusDashboardService = void 0;
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
const logger_1 = require("../config/logger");
const bot_settings_service_1 = require("./bot-settings.service");
class StatusDashboardService {
    static interval = null;
    static UPDATE_INTERVAL = 180_000; // Update every 3 minutes (reduced from 1 min)
    static start() {
        if (this.interval) {
            return;
        }
        logger_1.Logger.info("Status dashboard started.");
        void this.update();
        this.interval = setInterval(() => {
            void this.update();
        }, this.UPDATE_INTERVAL);
    }
    static stop() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
        logger_1.Logger.info("Status dashboard stopped.");
    }
    static async update() {
        try {
            if (!client_1.client.isReady()) {
                return;
            }
            const channelId = await bot_settings_service_1.botSettingsService.get("health_channel_id");
            if (!channelId) {
                logger_1.Logger.warn("Health channel ID not configured.");
                return;
            }
            const channel = await client_1.client.channels.fetch(channelId);
            if (!channel ||
                !(channel instanceof discord_js_1.TextChannel)) {
                logger_1.Logger.error("Health channel is invalid.");
                return;
            }
            let message = null;
            const messageId = await bot_settings_service_1.botSettingsService.get("health_message_id");
            if (messageId) {
                try {
                    message =
                        await channel.messages.fetch(messageId);
                }
                catch {
                    message = null;
                }
            }
            const embed = this.createEmbed();
            if (message) {
                await message.edit({
                    embeds: [embed],
                });
            }
            else {
                const newMessage = await channel.send({
                    embeds: [embed],
                });
                await bot_settings_service_1.botSettingsService.set("health_message_id", newMessage.id);
            }
        }
        catch (error) {
            logger_1.Logger.error("Status dashboard update failed:", error);
        }
    }
    static createEmbed() {
        const memory = process.memoryUsage();
        return new discord_js_1.EmbedBuilder()
            .setTitle("🟢 XMD Management Portal")
            .setDescription("Live system monitoring dashboard")
            .addFields({
            name: "Website",
            value: "🟢 Online",
            inline: true,
        }, {
            name: "Discord Bot",
            value: client_1.client.isReady()
                ? "🟢 Online"
                : "🔴 Offline",
            inline: true,
        }, {
            name: "Database",
            value: "🟢 Connected",
            inline: true,
        }, {
            name: "Gateway Ping",
            value: client_1.client.ws.ping >= 0
                ? `${client_1.client.ws.ping}ms`
                : "N/A",
            inline: true,
        }, {
            name: "Guilds",
            value: `${client_1.client.guilds.cache.size}`,
            inline: true,
        }, {
            name: "Commands",
            value: `${client_1.client.commands.size}`,
            inline: true,
        }, {
            name: "Memory",
            value: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
            inline: true,
        }, {
            name: "Uptime",
            value: this.formatUptime(process.uptime()),
            inline: true,
        })
            .setTimestamp()
            .setFooter({
            text: "XMD Operations Monitoring",
        });
    }
    static formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${days}d ${hours}h ${minutes}m`;
    }
}
exports.StatusDashboardService = StatusDashboardService;
exports.statusDashboardService = StatusDashboardService;
