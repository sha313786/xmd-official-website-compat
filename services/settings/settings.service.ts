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

interface SettingsRow<T = unknown> {
  id: string;
  category: SettingsCategory;
  data: T;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}
interface SettingsMetadata {
  updatedAt: string | null;
  updatedBy: string | null;
}

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
      .eq("category", category)
      .single();

    if (error) {
      console.error(error);
      return defaults;
    }

    if (!data?.data) {
      return defaults;
    }

    return {
      ...defaults,
      ...(data.data as T),
    };
  },

  async saveCategory<T>(
    category: SettingsCategory,
    values: T,
    updatedBy?: string
  ): Promise<void> {
    if (config.useMockData) {
      console.log("MOCK SETTINGS SAVE", category, values);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("settings")
      .update({
        data: values,
        updated_by: updatedBy ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("category", category);

    if (error) {
      console.error(error);
      throw error;
    }
  },
    async getMetadata(
    category: SettingsCategory
  ): Promise<SettingsMetadata> {
    if (config.useMockData) {
      return {
        updatedAt: null,
        updatedBy: null,
      };
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("settings")
      .select("updated_at, updated_by")
      .eq("category", category)
      .maybeSingle()
      console.log("Metadata Query:", {
  category,
  data,
  error,
});

    if (error) {
      console.error(error);

      return {
        updatedAt: null,
        updatedBy: null,
      };
    }

    return {
      updatedAt: data?.updated_at ?? null,
      updatedBy: data?.updated_by ?? null,
    };
  },

  async getGeneral(): Promise<GeneralSettings> {
    return this.getCategory("general", {
      organizationName: "XMD",
      websiteName: "XMD Official",
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      maintenanceMode: false,
    });
  },

  async saveGeneral(values: GeneralSettings) {
    return this.saveCategory("general", values);
  },

  async getRecruitment(): Promise<RecruitmentSettings> {
    return this.getCategory("recruitment", {
      recruitmentOpen: true,
      publicRecruitment: true,
      autoAccept: false,
      autoRejectDays: 30,
      maxApplications: 100,
      recruitmentMessage: "Applications are currently open.",
    });
  },

  async saveRecruitment(values: RecruitmentSettings) {
    return this.saveCategory("recruitment", values);
  },

  async getDiscord(): Promise<DiscordSettings> {
    return this.getCategory("discord", {
      botEnabled: true,
      guildId: "",
      verificationRoleId: "",
      verificationChannelId: "",
      dutyPanelChannelId: "",
      dutyLogsChannelId: "",
    });
  },

  async saveDiscord(values: DiscordSettings) {
    return this.saveCategory("discord", values);
  },

  async getWebsite(): Promise<WebsiteSettings> {
    return this.getCategory("website", {
      heroTitle: "Welcome to XMD",
      heroSubtitle: "Advancing Through X-pertise",
      footerText: "© XMD Official",
      contactEmail: "",
      discordInvite: "",
      youtubeUrl: "",
    });
  },

  async saveWebsite(values: WebsiteSettings) {
    return this.saveCategory("website", values);
  },

  async getSecurity(): Promise<SecuritySettings> {
    return this.getCategory("security", {
      discordLoginOnly: true,
      sessionTimeoutMinutes: 60,
      auditLogging: true,
    });
  },

  async saveSecurity(values: SecuritySettings) {
    return this.saveCategory("security", values);
  },

  async getAll() {
    if (config.useMockData) {
      return [];
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .order("category");

    if (error) {
      console.error(error);
      throw error;
    }

    return data as SettingsRow[];
  },
};