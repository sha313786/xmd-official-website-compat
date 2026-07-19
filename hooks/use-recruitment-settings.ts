"use client";

import { useCallback, useEffect, useState } from "react";

import {
  recruitmentSettingsService,
  RecruitmentSettings,
} from "@/services/recruitment-settings.service";

export function useRecruitmentSettings() {
  const [settings, setSettings] =
    useState<RecruitmentSettings | null>(null);

  const [loading, setLoading] = useState(true);

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
  const id = requestAnimationFrame(() => {
    void loadSettings();
  });

  return () => cancelAnimationFrame(id);
}, [loadSettings]);

  const toggleRecruitment = async () => {
    try {
      const updated =
        await recruitmentSettingsService.toggleRecruitment();

      setSettings(updated);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateSettings = async (
    updates: Partial<RecruitmentSettings>
  ) => {
    try {
      const updated =
        await recruitmentSettingsService.updateSettings(
          updates
        );

      setSettings(updated);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateNotice = async (
    notice: string
  ) => {
    try {
      const updated =
        await recruitmentSettingsService.updateNotice(
          notice
        );

      setSettings(updated);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateDiscordInvite = async (
    invite: string
  ) => {
    try {
      const updated =
        await recruitmentSettingsService.updateDiscordInvite(
          invite
        );

      setSettings(updated);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateCurrentCycle = async (
    cycleId: string | null
  ) => {
    try {
      const updated =
        await recruitmentSettingsService.updateCurrentCycle(
          cycleId
        );

      setSettings(updated);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    settings,
    loading,
    error,
    refresh: loadSettings,
    toggleRecruitment,
    updateSettings,
    updateNotice,
    updateDiscordInvite,
    updateCurrentCycle,
  };
}