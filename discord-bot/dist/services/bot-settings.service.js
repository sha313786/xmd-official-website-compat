"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botSettingsService = exports.BotSettingsService = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("../config/env");
const supabase = (0, supabase_js_1.createClient)(env_1.env.SUPABASE_URL, env_1.env.SUPABASE_SERVICE_ROLE_KEY);
class BotSettingsService {
    static async get(key) {
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
    static async set(key, value) {
        const { error } = await supabase
            .from("bot_settings")
            .upsert({
            key,
            value,
        }, {
            onConflict: "key",
        });
        if (error) {
            throw error;
        }
    }
}
exports.BotSettingsService = BotSettingsService;
exports.botSettingsService = BotSettingsService;
