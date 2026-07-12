"use client";

import { useEffect, useState } from "react";

import {
  PromotionCycle,
  PromotionResult,
} from "@/types/promotion";

import { promotionService } from "@/services/promotion.service";
import {
  DashboardRoleService,
} from "@/services/dashboard/dashboard-role.service";

export function useMemberPromotion() {
  const [cycle, setCycle] =
    useState<PromotionCycle | null>(null);

  const [result, setResult] =
    useState<PromotionResult | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
  try {
    setLoading(true);

    console.log("Step 1");

    const dashboardUser =
      await DashboardRoleService.getDashboardUser();

    console.log("Dashboard User:", dashboardUser);

    if (!dashboardUser) {
      setLoading(false);
      return;
    }

    console.log("Step 2");

    const activeCycle =
      await promotionService.getActiveCycle();

    console.log("Active Cycle:", activeCycle);

    if (!activeCycle) {
      setLoading(false);
      return;
    }

    console.log("Step 3");

    const memberResult =
      await promotionService.getMemberResult(
        activeCycle.id,
        dashboardUser.id
      );

    console.log("Member Result:", memberResult);

    setCycle(activeCycle);
    setResult(memberResult);
  } catch (error) {
    console.error("Promotion Hook Error:", error);
  } finally {
    setLoading(false);
  }
}

    load();
  }, []);

  return {
    cycle,
    result,
    loading,
  };
}