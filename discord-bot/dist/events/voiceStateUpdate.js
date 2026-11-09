"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const discord_js_1 = require("discord.js");

async function execute(oldState, newState) {
    try {
        // ==========================================
        // CONFIGURATION
        // ==========================================

        const monitoredVcId =
            process.env.MONITORED_VC_ID;

        const logChannelId =
            process.env.VC_LOG_CHANNEL_ID;

        // Configuration check
        if (!monitoredVcId) {
            console.error(
                "[VC JOIN] MONITORED_VC_ID is not configured."
            );
            return;
        }

        if (!logChannelId) {
            console.error(
                "[VC JOIN] VC_LOG_CHANNEL_ID is not configured."
            );
            return;
        }

        // ==========================================
        // ONLY DETECT JOIN
        // ==========================================

        // User was already in the monitored VC.
        // Therefore this is NOT a join.
        if (oldState.channelId === monitoredVcId) {
            return;
        }

        // User is not entering the monitored VC.
        if (newState.channelId !== monitoredVcId) {
            return;
        }

        // Ignore bots
        if (newState.member?.user.bot) {
            return;
        }

        const client = newState.client;

        // ==========================================
        // GET LOG CHANNEL
        // ==========================================

        const logChannel =
            await client.channels.fetch(logChannelId);

        if (
            !logChannel ||
            !logChannel.isTextBased()
        ) {
            console.error(
                "[VC JOIN] Log channel is not a text channel."
            );
            return;
        }

        // ==========================================
        // MEMBER INFORMATION
        // ==========================================

        const member = newState.member;

        const username =
            member?.user?.username ??
            "Unknown User";

        const displayName =
            member?.displayName ??
            username;

        const voiceChannel =
            newState.channel;

        // ==========================================
        // CREATE EMBED
        // ==========================================

        const embed =
            new discord_js_1.EmbedBuilder()
                .setColor(0x00c853)
                .setTitle("🟢 VOICE CHANNEL JOIN")
                .setDescription(
                    `<@${newState.id}> joined the monitored voice channel.`
                )
                .addFields(
                    {
                        name: "Member",
                        value: displayName,
                        inline: true
                    },
                    {
                        name: "Username",
                        value: `@${username}`,
                        inline: true
                    },
                    {
                        name: "Channel",
                        value:
                            voiceChannel
                                ? `🔊 ${voiceChannel.name}`
                                : "Unknown",
                        inline: false
                    }
                )
                .setFooter({
                    text:
                        "XMD Management Portal • Voice System"
                })
                .setTimestamp();

        // ==========================================
        // SEND LOG
        // ==========================================

        await logChannel.send({
            embeds: [embed]
        });

        console.log(
            `[VC JOIN] ${displayName} joined ${voiceChannel?.name ?? "monitored VC"}`
        );
    }
    catch (error) {
        console.error(
            "[VC JOIN] Failed to process voice channel join:",
            error
        );
    }
}

exports.default = {
    name: discord_js_1.Events.VoiceStateUpdate,
    execute
};