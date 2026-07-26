import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENV_VARS = [
  "DISCORD_TOKEN",
  "CLIENT_ID",
  "GUILD_ID",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

const missing = REQUIRED_ENV_VARS.filter(
  (key) => !process.env[key]
);

if (missing.length > 0) {
  throw new Error(
    [
      "Missing required environment variables:",
      ...missing.map((key) => `- ${key}`),
    ].join("\n")
  );
}

export const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
  CLIENT_ID: process.env.CLIENT_ID!,
  GUILD_ID: process.env.GUILD_ID!,

  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY!,

  NODE_ENV: process.env.NODE_ENV ?? "development",
};