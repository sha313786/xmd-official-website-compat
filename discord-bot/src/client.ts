import { Client, GatewayIntentBits, Partials } from "discord.js";

export const client = new Client({
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
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
  ],
});
