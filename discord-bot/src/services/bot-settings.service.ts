import { createClient } from "@supabase/supabase-js";

import { env } from "../config/env";

const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

export class BotSettingsService {
  static async get(key: string): Promise<string | null> {
    const { data, error } = await supabase
      .from("bot_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data?.value ?? null;
  }

  static async set(
    key: string,
    value: string
  ): Promise<void> {
    const { error } = await supabase
      .from("bot_settings")
      .upsert(
        {
          key,
          value,
        },
        {
          onConflict: "key",
        }
      );

    if (error) {
      throw error;
    }
  }
}

export const botSettingsService =
  BotSettingsService;