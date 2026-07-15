"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

import {
  dashboardDutyService,
  ActiveDutyMember,
  DashboardDutyStats,
} from "@/services/dashboard-duty.service";

interface UseDashboardDutyReturn {
  activeDutyMembers: ActiveDutyMember[];
  stats: DashboardDutyStats;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const defaultStats: DashboardDutyStats = {
  activeDuty: 0,
  activeMembersToday: 0,
  todayDutyHours: 0,
  promotionCycleHours: 0,
};

export function useDashboardDuty(): UseDashboardDutyReturn {
  const [activeDutyMembers, setActiveDutyMembers] = useState<
    ActiveDutyMember[]
  >([]);

  const [stats, setStats] =
    useState<DashboardDutyStats>(defaultStats);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setError(null);

      const [members, dashboardStats] =
        await Promise.all([
          dashboardDutyService.getActiveDutyMembers(),
          dashboardDutyService.getDashboardStats(),
        ]);

      setActiveDutyMembers(members);
      setStats(dashboardStats);
    } catch (err) {
      console.error(
        "Failed to load dashboard:",
        err
      );
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const channel = supabase
      .channel("dashboard-duty-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "duty_logs",
        },
        () => {
          loadDashboard();
        }
      )
      .subscribe();

    const interval = setInterval(() => {
      loadDashboard();
    }, 30000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [loadDashboard]);

  return {
    activeDutyMembers,
    stats,
    loading,
    error,
    refresh: loadDashboard,
  };
}