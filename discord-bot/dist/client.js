"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({
    rest: {
        timeout: 30000,
        api: process.env.DISCORD_API_BASE_URL
            ? `${process.env.DISCORD_API_BASE_URL.replace(/\/$/, '')}/api`
            : 'https://discord.com/api',
        headers: process.env.DISCORD_PROXY_SECRET
            ? { 'x-proxy-auth': process.env.DISCORD_PROXY_SECRET }
            : undefined,
    },
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message,
        discord_js_1.Partials.Reaction,
        discord_js_1.Partials.User,
        discord_js_1.Partials.GuildMember,
    ],
});
