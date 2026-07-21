"use client";

import { useCallback, useEffect, useState } from "react";

import { settingsService } from "@/services/settings/settings.service";

import type {
  GeneralSettings,
  RecruitmentSettings,
  DiscordSettings,
  WebsiteSettings,
  SecuritySettings,
} from "@/types/settings";

interface SettingsMetadata {
  updatedAt: string | null;
  updatedBy: string | null;
}

export function useSettings() {
  const [general, setGeneral] =
    useState<GeneralSettings | null>(null);

  const [recruitment, setRecruitment] =
    useState<RecruitmentSettings | null>(null);

  const [discord, setDiscord] =
    useState<DiscordSettings | null>(null);

  const [website, setWebsite] =
    useState<WebsiteSettings | null>(null);

  const [security, setSecurity] =
    useState<SecuritySettings | null>(null);

  const [generalMetadata, setGeneralMetadata] =
    useState<SettingsMetadata | null>(null);

  const [recruitmentMetadata, setRecruitmentMetadata] =
    useState<SettingsMetadata | null>(null);

  const [discordMetadata, setDiscordMetadata] =
    useState<SettingsMetadata | null>(null);

  const [websiteMetadata, setWebsiteMetadata] =
    useState<SettingsMetadata | null>(null);

  const [securityMetadata, setSecurityMetadata] =
    useState<SettingsMetadata | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const [
  generalData,
  recruitmentData,
  discordData,
  websiteData,
  securityData,

  generalMeta,
  recruitmentMeta,
  discordMeta,
  websiteMeta,
  securityMeta,
] = await Promise.all([
  settingsService.getGeneral(),
  settingsService.getRecruitment(),
  settingsService.getDiscord(),
  settingsService.getWebsite(),
  settingsService.getSecurity(),

  settingsService.getMetadata("general"),
  settingsService.getMetadata("recruitment"),
  settingsService.getMetadata("discord"),
  settingsService.getMetadata("website"),
  settingsService.getMetadata("security"),
]);

      setGeneral(generalData);
      setRecruitment(recruitmentData);
      setDiscord(discordData);
      setWebsite(websiteData);
      setSecurity(securityData);
      setGeneralMetadata(generalMeta);
      setRecruitmentMetadata(recruitmentMeta);
      setDiscordMetadata(discordMeta);
      setWebsiteMetadata(websiteMeta);
      setSecurityMetadata(securityMeta);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveGeneral = async (
  values: GeneralSettings
) => {
  await settingsService.saveGeneral(values);
  setGeneral(values);

  const metadata =
    await settingsService.getMetadata("general");

  setGeneralMetadata(metadata);
};

  const saveRecruitment = async (
  values: RecruitmentSettings
) => {
  await settingsService.saveRecruitment(values);
  setRecruitment(values);

  const metadata =
    await settingsService.getMetadata("recruitment");

  setRecruitmentMetadata(metadata);
};

  const saveDiscord = async (
  values: DiscordSettings
) => {
  await settingsService.saveDiscord(values);
  setDiscord(values);

  const metadata =
    await settingsService.getMetadata("discord");

  setDiscordMetadata(metadata);
};

  const saveWebsite = async (
  values: WebsiteSettings
) => {
  await settingsService.saveWebsite(values);
  setWebsite(values);

  const metadata =
    await settingsService.getMetadata("website");

  setWebsiteMetadata(metadata);
};

  const saveSecurity = async (
  values: SecuritySettings
) => {
  await settingsService.saveSecurity(values);
  setSecurity(values);

  const metadata =
    await settingsService.getMetadata("security");

  setSecurityMetadata(metadata);
};

  return {
    loading,

    general,
    recruitment,
    discord,
    website,
    security,
    generalMetadata,
    recruitmentMetadata,
    discordMetadata,
    websiteMetadata,
    securityMetadata,

    refresh,

    saveGeneral,
    saveRecruitment,
    saveDiscord,
    saveWebsite,
    saveSecurity,
  };
}