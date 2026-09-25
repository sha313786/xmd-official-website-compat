"use client";

import { useCallback, useEffect, useState } from "react";

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

  const loadPromotion = useCallback(async () => {
    try {
      setLoading(true);

      console.log("========== MEMBER PROMOTION LOAD ==========");

      // --------------------------------------------------
      // 1. Get logged-in dashboard member
      // --------------------------------------------------

      const dashboardUser =
        await DashboardRoleService.getDashboardUser();

      console.log("Dashboard User:", dashboardUser);

      if (!dashboardUser) {
        setCycle(null);
        setResult(null);
        return;
      }

      // --------------------------------------------------
      // 2. Get active promotion cycle
      // --------------------------------------------------

      const activeCycle =
        await promotionService.getActiveCycle();

      console.log("Active Cycle:", activeCycle);

      if (!activeCycle) {
        setCycle(null);
        setResult(null);
        return;
      }

      // --------------------------------------------------
      // 3. Get stored promotion result
      //
      // This still provides:
      // - leaderboard position
      // - promotion type
      // - promotion result
      // - other engine-generated values
      // --------------------------------------------------

      const storedResult =
        await promotionService.getMemberResult(
          activeCycle.id,
          dashboardUser.id
        );

      console.log("Stored Promotion Result:", storedResult);

      // --------------------------------------------------
      // 4. Get LIVE duty logs for this member + cycle
      // --------------------------------------------------

      const dutyLogs =
        await promotionService.getDutyLogs(
          activeCycle.id
        );

      console.log(
        "All Duty Logs:",
        dutyLogs
      );

      // Only use this member's logs
      const memberDutyLogs =
        dutyLogs.filter(
          (log) =>
            log.member_id === dashboardUser.id
        );

      console.log(
        "Member Duty Logs:",
        memberDutyLogs
      );

      // --------------------------------------------------
      // 5. Calculate current duty hours directly
      //    from duty_logs
      // --------------------------------------------------

      const totalHours =
        memberDutyLogs.reduce(
          (total, log) =>
            total +
            Number(log.duty_hours ?? 0),
          0
        );

      // --------------------------------------------------
      // 6. Calculate unique duty days
      // --------------------------------------------------

      const dutyDays =
        new Set(
          memberDutyLogs
            .map(
              (log) =>
                log.normalized_duty_date
            )
            .filter(Boolean)
        ).size;

      console.log(
        "LIVE Duty Hours:",
        totalHours
      );

      console.log(
        "LIVE Duty Days:",
        dutyDays
      );

      // --------------------------------------------------
      // 7. Keep promotion result information
      //    but replace stale duty totals
      // --------------------------------------------------

      const liveResult =
        storedResult
          ? {
              ...storedResult,

              // IMPORTANT:
              // Always use duty_logs for live hours
              total_hours: Number(
                totalHours.toFixed(2)
              ),

              // IMPORTANT:
              // Always use duty_logs for live days
              duty_days: dutyDays,
            }
          : null;

      console.log(
        "Final Member Promotion Result:",
        liveResult
      );

      // --------------------------------------------------
      // 8. Update state
      // --------------------------------------------------

      setCycle(activeCycle);
      setResult(liveResult);

      console.log(
        "=========================================="
      );
    } catch (error) {
      console.error(
        "Member Promotion Load Error:",
        error
      );

      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------------------------------------
  // Initial load
  // ----------------------------------------------------

  useEffect(() => {
    void loadPromotion();
  }, [loadPromotion]);

  // ----------------------------------------------------
  // Refresh when user comes back to the page/tab
  // ----------------------------------------------------

  useEffect(() => {
    const handleFocus = () => {
      void loadPromotion();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [loadPromotion]);

  return {
    cycle,
    result,
    loading,

    // Expose refresh in case another component
    // needs to manually refresh promotion data.
    refresh: loadPromotion,
  };
}