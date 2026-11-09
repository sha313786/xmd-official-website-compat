"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nickname_1 = require("../config/nickname");
const nickname_service_1 = require("../services/nickname.service");
const processed = new Set();
exports.default = {
    name: discord_js_1.Events.MessageReactionAdd,
    async execute(reaction, user) {
        console.log(`[NICKNAME] Reaction received: ${reaction.emoji.name} by ${user.tag}`);
        if (user.bot) {
            console.log("[NICKNAME] Ignored: bot user");
            return;
        }
        try {
            if (reaction.partial) {
                console.log("[NICKNAME] Fetching partial reaction...");
                await reaction.fetch();
            }
            if (reaction.message.partial) {
                console.log("[NICKNAME] Fetching partial message...");
                await reaction.message.fetch();
            }
            const message = reaction.message;
            console.log(`[NICKNAME] Message channel: ${message.channel.id}`);
            console.log(`[NICKNAME] Config channel: ${nickname_1.NicknameConfig.CHANNEL_ID}`);
            if (message.channel.id !== nickname_1.NicknameConfig.CHANNEL_ID) {
                console.log("[NICKNAME] Ignored: wrong channel");
                return;
            }
            if (processed.has(message.id)) {
                console.log("[NICKNAME] Ignored: already processed");
                return;
            }
            const guild = message.guild;
            if (!guild) {
                console.log("[NICKNAME] Ignored: no guild");
                return;
            }
            const staff = await guild.members.fetch(user.id);
            console.log(`[NICKNAME] Staff: ${staff.user.tag}`);
            console.log(`[NICKNAME] Staff roles: ${staff.roles.cache
                .map(role => role.id)
                .join(", ")}`);
            console.log(`[NICKNAME] Required management role: ${nickname_1.NicknameConfig.MANAGEMENT_ROLE_ID}`);
            if (!staff.roles.cache.has(nickname_1.NicknameConfig.MANAGEMENT_ROLE_ID)) {
                console.log("[NICKNAME] Ignored: user does not have management role");
                return;
            }
            const author = message.author;
            if (!author) {
                console.log("[NICKNAME] Ignored: no message author");
                return;
            }
            const target = await guild.members.fetch(author.id);
            const content = message.content;
            if (!content) {
                console.log("[NICKNAME] Ignored: empty message");
                return;
            }
            const rpName = nickname_service_1.NicknameService.normalize(content);
            const emoji = reaction.emoji.name;
            console.log(`[NICKNAME] Processing emoji: ${emoji}`);
            if (!emoji) {
                return;
            }
            switch (emoji) {
                case "✅": {
                    processed.add(message.id);
                    await nickname_service_1.NicknameService.changeNickname(target, rpName);
                    await message.reply(`✅ ${target}, your nickname has been changed to **${nickname_service_1.NicknameService.format(rpName)}**.`);
                    await message.reactions.removeAll();
                    console.log(`[NICKNAME] Successfully changed nickname for ${target.user.tag}`);
                    break;
                }
                case "❌": {
                    processed.add(message.id);
                    await message.reply(`❌ ${target}, your nickname request has been rejected.`);
                    await message.reactions.removeAll();
                    console.log(`[NICKNAME] Nickname request rejected for ${target.user.tag}`);
                    break;
                }
                default:
                    console.log(`[NICKNAME] Ignored emoji: ${emoji}`);
                    break;
            }
        }
        catch (error) {
            console.error("[NICKNAME] Reaction handler error:", error);
        }
    },
};
