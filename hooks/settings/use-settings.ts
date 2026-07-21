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
      ] = await Promise.all([
        settingsService.getGeneral(),
        settingsService.getRecruitment(),
        settingsService.getDiscord(),
        settingsService.getWebsite(),
        settingsService.getSecurity(),
      ]);

      setGeneral(generalData);
      setRecruitment(recruitmentData);
      setDiscord(discordData);
      setWebsite(websiteData);
      setSecurity(securityData);
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
  };

  const saveRecruitment = async (
    values: RecruitmentSettings
  ) => {
    await settingsService.saveRecruitment(values);
    setRecruitment(values);
  };

  const saveDiscord = async (
    values: DiscordSettings
  ) => {
    await settingsService.saveDiscord(values);
    setDiscord(values);
  };

  const saveWebsite = async (
    values: WebsiteSettings
  ) => {
    await settingsService.saveWebsite(values);
    setWebsite(values);
  };

  const saveSecurity = async (
    values: SecuritySettings
  ) => {
    await settingsService.saveSecurity(values);
    setSecurity(values);
  };

  return {
    loading,

    general,
    recruitment,
    discord,
    website,
    security,

    refresh,

    saveGeneral,
    saveRecruitment,
    saveDiscord,
    saveWebsite,
    saveSecurity,
  };
}