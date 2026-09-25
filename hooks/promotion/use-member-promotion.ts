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

        // ---------------------------------------------
        // 1. Get logged-in member
        // ---------------------------------------------

        const dashboardUser =
          await DashboardRoleService.getDashboardUser();

        console.log(
          "[PROMOTION] Dashboard User:",
          dashboardUser
        );

        if (!dashboardUser) {
          setCycle(null);
          setResult(null);
          return;
        }

        // ---------------------------------------------
        // 2. Get active promotion cycle
        // ---------------------------------------------

        const activeCycle =
          await promotionService.getActiveCycle();

        console.log(
          "[PROMOTION] Active Cycle:",
          activeCycle
        );

        if (!activeCycle) {
          setCycle(null);
          setResult(null);
          return;
        }

        setCycle(activeCycle);

        // ---------------------------------------------
        // 3. Get stored promotion result
        //
        // This is ONLY for:
        // - leaderboard position
        // - promotion type
        // - promotion result
        // ---------------------------------------------

        const memberResult =
          await promotionService.getMemberResult(
            activeCycle.id,
            dashboardUser.id
          );

        console.log(
          "[PROMOTION] Stored Result:",
          memberResult
        );

        // ---------------------------------------------
        // 4. Get ALL duty logs for ACTIVE cycle
        // ---------------------------------------------

        const dutyLogs =
          await promotionService.getDutyLogs(
            activeCycle.id
          );

        console.log(
          "[PROMOTION] Duty Logs:",
          dutyLogs
        );

        // ---------------------------------------------
        // 5. Filter THIS MEMBER
        // ---------------------------------------------

        const memberDutyLogs =
          dutyLogs.filter(
            (log) =>
              String(log.member_id) ===
              String(dashboardUser.id)
          );

        console.log(
          "[PROMOTION] Member ID:",
          dashboardUser.id
        );

        console.log(
          "[PROMOTION] Member Duty Logs:",
          memberDutyLogs
        );

        // ---------------------------------------------
        // 6. Calculate LIVE duty hours
        // ---------------------------------------------

        const totalHours =
          memberDutyLogs.reduce(
            (total, log) =>
              total +
              Number(log.duty_hours ?? 0),
            0
          );

        // ---------------------------------------------
        // 7. Calculate LIVE duty days
        // ---------------------------------------------

        const dutyDates =
          memberDutyLogs
            .map(
              (log) =>
                log.normalized_duty_date
            )
            .filter(
              (
                date
              ): date is string =>
                Boolean(date)
            );

        const dutyDays =
          new Set(dutyDates).size;

        console.log(
          "[PROMOTION] LIVE HOURS:",
          totalHours
        );

        console.log(
          "[PROMOTION] LIVE DAYS:",
          dutyDays
        );

        // ---------------------------------------------
        // 8. Create result even if promotion_results
        //    does not exist yet
        // ---------------------------------------------

        const liveResult =
          {
            ...(memberResult ?? {}),

            cycle_id:
              activeCycle.id,

            member_id:
              dashboardUser.id,

            total_hours:
              Number(
                totalHours.toFixed(2)
              ),

            duty_days:
              dutyDays,
          } as PromotionResult;

        console.log(
          "[PROMOTION] FINAL RESULT:",
          liveResult
        );

        setResult(liveResult);
      } catch (error) {
        console.error(
          "[PROMOTION] LOAD ERROR:",
          error
        );

        setCycle(null);
        setResult(null);
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