import { z } from "zod";

export const generalSettingsSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name is required"),

  websiteName: z
    .string()
    .min(2, "Website name is required"),

  timezone: z.string(),

  dateFormat: z.string(),

  maintenanceMode: z.boolean(),
});

export type GeneralSettingsForm = z.infer<
  typeof generalSettingsSchema
>;
export const recruitmentSettingsSchema = z.object({
  recruitmentOpen: z.boolean(),

  publicRecruitmentEnabled: z.boolean(),

  autoAcceptApplications: z.boolean(),

  autoRejectAfterDays: z
    .number()
    .min(1, "Must be at least 1 day")
    .max(365),

  maxApplicationsPerUser: z
    .number()
    .min(1)
    .max(10000),

  recruitmentMessage: z
    .string()
    .max(1000),
});

export type RecruitmentSettingsForm =
  z.infer<typeof recruitmentSettingsSchema>;
  export const discordSettingsSchema = z.object({
  botEnabled: z.boolean(),

  guildId: z
    .string()
    .min(17, "Invalid Guild ID")
    .max(20),

  verificationRoleId: z.string(),

verificationChannelId: z.string(),

dutyPanelChannelId: z.string(),

dutyLogsChannelId: z.string(),
});

export type DiscordSettingsForm = z.infer<
  typeof discordSettingsSchema
>;
export const websiteSettingsSchema = z.object({
  heroTitle: z
    .string()
    .min(2, "Hero title is required"),

  heroSubtitle: z
    .string()
    .min(2, "Hero subtitle is required"),

  footerText: z
    .string()
    .min(2, "Footer text is required"),

  contactEmail: z
    .email("Invalid email address"),

  discordInvite: z
    .url("Invalid Discord invite URL"),

  youtubeUrl: z
    .url("Invalid YouTube URL"),
});

export type WebsiteSettingsForm = z.infer<
  typeof websiteSettingsSchema
>;
export const securitySettingsSchema = z.object({
  discordLoginOnly: z.boolean(),

  sessionTimeoutMinutes: z
    .number()
    .min(5, "Minimum 5 minutes")
    .max(1440, "Maximum 1440 minutes"),

  auditLogging: z.boolean(),
});

export type SecuritySettingsForm = z.infer<
  typeof securitySettingsSchema
>;