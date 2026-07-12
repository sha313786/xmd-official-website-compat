"use client";

import { useEffect, useState } from "react";

import { Member } from "@/types/member";

import {
  DashboardRoleService,
} from "@/services/dashboard/dashboard-role.service";

import {
  ProfileService,
} from "@/services/profile/profile-service";

export function useProfile() {
  const [profile, setProfile] =
    useState<Member | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);

      const dashboardUser =
        await DashboardRoleService.getDashboardUser();

      if (!dashboardUser) {
        setLoading(false);
        return;
      }

      const member =
        await ProfileService.getProfile(
          dashboardUser.id
        );

      setProfile(member);
      setLoading(false);
    }

    loadProfile();
  }, []);

  return {
    profile,
    loading,
  };
}