"use client";

import { useCallback, useEffect, useState } from "react";

import {
  recruitmentSettingsService,
  RecruitmentSettings,
} from "@/services/recruitment-settings.service";

export function useRecruitmentSettings() {
  const [settings, setSettings] =
    useState<RecruitmentSettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await recruitmentSettingsService.getSettings();

      setSettings(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load recruitment settings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    error,
    refresh: loadSettings,

    toggleRecruitment: async () => {
      const updated =
        await recruitmentSettingsService.toggleRecruitment();
      setSettings(updated);
      return updated;
    },

    updateNotice: async (notice: string) => {
      const updated =
        await recruitmentSettingsService.updateNotice(notice);
      setSettings(updated);
      return updated;
    },

    updateDiscordInvite: async (invite: string) => {
      const updated =
        await recruitmentSettingsService.updateDiscordInvite(invite);
      setSettings(updated);
      return updated;
    },

    updateSchedule: async (schedule: {
      application_start: string | null;
      application_end: string | null;
      interview_start: string | null;
      interview_end: string | null;
      result_date: string | null;
    }) => {
      const updated =
        await recruitmentSettingsService.updateSchedule(schedule);
      setSettings(updated);
      return updated;
    },

    updateSettings: async (
      updates: Partial<RecruitmentSettings>
    ) => {
      const updated =
        await recruitmentSettingsService.updateSettings(updates);
      setSettings(updated);
      return updated;
    },
  };
}
