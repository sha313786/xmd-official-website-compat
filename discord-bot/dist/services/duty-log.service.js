"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dutyLogService = exports.DutyLogService = void 0;
const discord_js_1 = require("discord.js");
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
const member_service_1 = require("./member.service");
class DutyLogService {
    static async getChannel(client) {
        try {
            const channel = await client.channels.fetch(env_1.env.DUTY_LOG_CHANNEL_ID);
            if (!channel || !channel.isTextBased()) {
                logger_1.Logger.warn("DUTY LOG: Configured channel is not a text channel.");
                return null;
            }
            return channel;
        }
        catch (error) {
            logger_1.Logger.error("DUTY LOG: Failed to fetch duty log channel.", error);
            return null;
        }
    }
    static async logOnDuty(client, discordId, session) {
        try {
            logger_1.Logger.info(`[DUTY LOG] Sending ON DUTY log for ${discordId}`);
            const channel = await this.getChannel(client);
            if (!channel) {
                return;
            }
            const member = await member_service_1.MemberService.getByDiscordId(discordId);
            const dutyStart = session.duty_start
                ? new Date(session.duty_start)
                : new Date();
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x00c853)
                .setTitle("🟢 XMD MEMBER ON DUTY")
                .setDescription(`<@${discordId}> has started duty.`)
                .addFields({
                name: "Member",
                value: member.full_name ?? "Unknown",
                inline: true,
            }, {
                name: "Badge",
                value: String(member.badge_number ?? "N/A"),
                inline: true,
            }, {
                name: "Rank",
                value: member.rank ?? "N/A",
                inline: true,
            }, {
                name: "Started",
                value: `<t:${Math.floor(dutyStart.getTime() / 1000)}:F>`,
                inline: false,
            }, {
                name: "Session ID",
                value: `\`${session.id ?? "N/A"}\``,
                inline: false,
            })
                .setFooter({
                text: "XMD Management Portal • Duty System",
            })
                .setTimestamp();
            await channel.send({
                embeds: [embed],
            });
            logger_1.Logger.success(`[DUTY LOG] ON DUTY log sent for ${member.full_name}`);
        }
        catch (error) {
            logger_1.Logger.error(`[DUTY LOG] Failed to send ON DUTY log for ${discordId}`, error);
        }
    }
    static async logOffDuty(client, target, session) {
        let discordId = "";
        try {
            let member;
            if (typeof target === "object" && target !== null) {
                member = target;
                discordId = member.discord_id ?? "";
            }
            else {
                discordId = String(target);
                member = await member_service_1.MemberService.getByDiscordId(discordId);
            }
            logger_1.Logger.info(`[DUTY LOG] Sending OFF DUTY log for ${discordId || member?.full_name}`);
            const channel = await this.getChannel(client);
            if (!channel) {
                return;
            }
            const dutyStart = session.duty_start
                ? new Date(session.duty_start)
                : null;
            const dutyEnd = session.duty_end
                ? new Date(session.duty_end)
                : new Date();
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xff1744)
                .setTitle("🔴 XMD MEMBER OFF DUTY")
                .setDescription(`<@${discordId}> has ended duty.`)
                .addFields({
                name: "Member",
                value: member.full_name ?? "Unknown",
                inline: true,
            }, {
                name: "Badge",
                value: String(member.badge_number ?? "N/A"),
                inline: true,
            }, {
                name: "Rank",
                value: member.rank ?? "N/A",
                inline: true,
            }, {
                name: "Started",
                value: dutyStart
                    ? `<t:${Math.floor(dutyStart.getTime() / 1000)}:F>`
                    : "N/A",
                inline: false,
            }, {
                name: "Ended",
                value: `<t:${Math.floor(dutyEnd.getTime() / 1000)}:F>`,
                inline: false,
            }, {
                name: "Total Duty Hours",
                value: `${session.duty_hours ?? 0} hours`,
                inline: true,
            }, {
                name: "Session ID",
                value: `\`${session.id ?? "N/A"}\``,
                inline: false,
            })
                .setFooter({
                text: "XMD Management Portal • Duty System",
            })
                .setTimestamp();
            await channel.send({
                embeds: [embed],
            });
            logger_1.Logger.success(`[DUTY LOG] OFF DUTY log sent for ${member.full_name}`);
        }
        catch (error) {
            logger_1.Logger.error(`[DUTY LOG] Failed to send OFF DUTY log for ${discordId}`, error);
        }
    }
}
exports.DutyLogService = DutyLogService;
exports.dutyLogService = DutyLogService;
