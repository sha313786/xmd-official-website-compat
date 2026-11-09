"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REQUIRED_ENV_VARS = [
    "DISCORD_TOKEN",
    "CLIENT_ID",
    "GUILD_ID",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "DUTY_LOG_CHANNEL_ID",
];
const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
    throw new Error([
        "Missing required environment variables:",
        ...missing.map((key) => `- ${key}`),
    ].join("\n"));
}
exports.env = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DUTY_LOG_CHANNEL_ID: process.env.DUTY_LOG_CHANNEL_ID,
    NODE_ENV: process.env.NODE_ENV ?? "development",
};
