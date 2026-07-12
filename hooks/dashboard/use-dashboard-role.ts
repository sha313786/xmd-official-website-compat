"use client";

import { useEffect, useState } from "react";

import {
  DashboardRoleService,
  DashboardUser,
} from "@/services/dashboard/dashboard-role.service";

export function useDashboardRole() {
  const [dashboardUser, setDashboardUser] =
    useState<DashboardUser | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardUser() {
      try {
        const user =
          await DashboardRoleService.getDashboardUser();

        setDashboardUser(user);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardUser();
  }, []);

  const isManagement =
    dashboardUser?.dashboard === "management";

  const isMember =
    dashboardUser?.dashboard === "member";

  return {
    dashboardUser,
    loading,
    isManagement,
    isMember,
  };
}