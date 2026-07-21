import { config } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";

import type {
  GeneralSettings,
  RecruitmentSettings,
  DiscordSettings,
  WebsiteSettings,
  SecuritySettings,
  SettingsCategory,
} from "@/types/settings";

type SettingRecord = {
  id: string;
  key: string;
  value: unknown;
  category: SettingsCategory;
  created_at: string;
  updated_at: string;
};

export const settingsService = {
  async getCategory<T>(
    category: SettingsCategory,
    defaults: T
  ): Promise<T> {
    if (config.useMockData) {
      return defaults;
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("category", category);

    if (error) {
      console.error(error);
      return defaults;
    }

    const result = { ...defaults };

    (data as SettingRecord[]).forEach((setting) => {
      (result as Record<string, unknown>)[setting.key] =
        setting.value;
    });

    return result;
  },

  async saveCategory<T>(
    category: SettingsCategory,
    values: T
  ): Promise<void> {
    if (config.useMockData) {
      console.log("MOCK SETTINGS SAVE", values);
      return;
    }

    const supabase = createClient();

    const entries = Object.entries(
      values as Record<string, unknown>
    );

    for (const [key, value] of entries) {
      const { error } = await supabase
        .from("settings")
        .upsert({
          category,
          key,
          value,
        });

      if (error) {
        console.error(error);
        throw error;
      }
    }
  },

  async getGeneral(): Promise<GeneralSettings> {
    return settingsService.getCategory<GeneralSettings>(
      "general",
      {
        organizationName: "XMD",
        websiteName: "XMD Official",
        timezone: "Asia/Kolkata",
        dateFormat: "DD/MM/YYYY",
        maintenanceMode: false,
      }
    );
  },

  async saveGeneral(
    values: GeneralSettings
  ): Promise<void> {
    return settingsService.saveCategory(
      "general",
      values
    );
  },

  async getRecruitment(): Promise<RecruitmentSettings> {
    return settingsService.getCategory<RecruitmentSettings>(
      "recruitment",
      {
        recruitmentOpen: true,
        publicRecruitmentEnabled: true,
        autoAcceptApplications: false,
        autoRejectAfterDays: 30,
        maxApplicationsPerUser: 1,
        recruitmentMessage:
          "Applications are currently open.",
      }
    );
  },

  async saveRecruitment(
    values: RecruitmentSettings
  ): Promise<void> {
    return settingsService.saveCategory(
      "recruitment",
      values
    );
  },

  async getDiscord(): Promise<DiscordSettings> {
    return settingsService.getCategory<DiscordSettings>(
      "discord",
      {
        guildId: "",
        botEnabled: true,
        dutyPanelChannelId: "",
        dutyLogsChannelId: "",
        verificationChannelId: "",
        verificationRoleId: "",
      }
    );
  },

  async saveDiscord(
    values: DiscordSettings
  ): Promise<void> {
    return settingsService.saveCategory(
      "discord",
      values
    );
  },

  async getWebsite(): Promise<WebsiteSettings> {
    return settingsService.getCategory<WebsiteSettings>(
      "website",
      {
        heroTitle: "XMD Official",
        heroSubtitle: "Advancing Through X-pertise",
        footerText: "© XMD Official",
        contactEmail: "",
        discordInvite: "",
        youtubeUrl: "",
      }
    );
  },

  async saveWebsite(
    values: WebsiteSettings
  ): Promise<void> {
    return settingsService.saveCategory(
      "website",
      values
    );
  },

  async getSecurity(): Promise<SecuritySettings> {
    return settingsService.getCategory<SecuritySettings>(
      "security",
      {
        discordLoginOnly: true,
        sessionTimeoutMinutes: 60,
        auditLogging: true,
      }
    );
  },

  async saveSecurity(
    values: SecuritySettings
  ): Promise<void> {
    return settingsService.saveCategory(
      "security",
      values
    );
  },
};