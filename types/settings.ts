export type SettingsCategory =
  | "general"
  | "recruitment"
  | "discord"
  | "website"
  | "security";

export interface Setting {
  id: string;

  key: string;
  value: unknown;

  category: SettingsCategory;

  createdAt?: string;
  updatedAt?: string;
}

export interface GeneralSettings {
  organizationName: string;
  websiteName: string;

  timezone: string;
  dateFormat: string;

  maintenanceMode: boolean;
}

export interface RecruitmentSettings {
  recruitmentOpen: boolean;

  publicRecruitmentEnabled: boolean;

  autoAcceptApplications: boolean;

  autoRejectAfterDays: number;

  maxApplicationsPerUser: number;

  recruitmentMessage: string;
}

export interface DiscordSettings {
  guildId: string;

  botEnabled: boolean;

  dutyPanelChannelId: string;

  dutyLogsChannelId: string;

  verificationChannelId: string;

  verificationRoleId: string;
}

export interface WebsiteSettings {
  heroTitle: string;

  heroSubtitle: string;

  footerText: string;

  contactEmail: string;

  discordInvite: string;

  youtubeUrl: string;
}

export interface SecuritySettings {
  discordLoginOnly: boolean;

  sessionTimeoutMinutes: number;

  auditLogging: boolean;
}

export interface SettingsState {
  general: GeneralSettings;

  recruitment: RecruitmentSettings;

  discord: DiscordSettings;

  website: WebsiteSettings;

  security: SecuritySettings;
}