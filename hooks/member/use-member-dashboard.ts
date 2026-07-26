"use client";

import { useCallback, useEffect, useState } from "react";

import { memberDashboardService } from "@/services/members/member-dashboard.service";

import { MemberDashboardData } from "@/types/member-dashboard";

export function useMemberDashboard(
  memberId: string
) {
  const [dashboard, setDashboard] =
    useState<MemberDashboardData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadDashboard =
    useCallback(async () => {
      if (!memberId) {
        setDashboard(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await memberDashboardService.getDashboard(
            memberId
          );

        if (!data) {
          setError(
            "Unable to load member dashboard."
          );
          setDashboard(null);
          return;
        }

        setDashboard(data);
      } catch (err) {
        console.error(
          "MEMBER DASHBOARD HOOK ERROR:",
          err
        );

        setError(
          "Failed to load dashboard."
        );

        setDashboard(null);
      } finally {
        setLoading(false);
      }
    }, [memberId]);

  useEffect(() => {
  const id = requestAnimationFrame(() => {
    void loadDashboard();
  });

  return () => cancelAnimationFrame(id);
}, [loadDashboard]);

  return {
    dashboard,

    profile:
      dashboard?.profile ?? null,

    statistics:
      dashboard?.statistics ?? null,

    activities:
      dashboard?.activities ?? [],

    loading,

    error,

    refresh: loadDashboard,
  };
}