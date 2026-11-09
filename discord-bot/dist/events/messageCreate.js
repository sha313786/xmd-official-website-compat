"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nickname_1 = require("../config/nickname");
exports.default = {
    name: discord_js_1.Events.MessageCreate,
    async execute(message) {
        // Ignore bots
        if (message.author.bot)
            return;
        // Only nickname channel
        if (message.channel.id !== nickname_1.NicknameConfig.CHANNEL_ID)
            return;
        // Normalize
        const rpName = message.content
            .trim()
            .replace(/\s+/g, " ")
            .toUpperCase();
        // Empty message
        if (!rpName)
            return;
        // Validate
        if (!nickname_1.NicknameConfig.NAME_REGEX.test(rpName)) {
            await message.reply("❌ Invalid RP Name.\nOnly letters and spaces are allowed.");
            return;
        }
        // Add reactions
        await message.react("✅");
        await message.react("❌");
    },
};
