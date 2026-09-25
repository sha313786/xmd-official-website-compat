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

        // Keep existing member lookup
        const dashboardUser =
          await DashboardRoleService.getDashboardUser();

        console.log("Dashboard User:", dashboardUser);

        if (!dashboardUser) {
          setLoading(false);
          return;
        }

        console.log("Step 2");

        // Keep existing active-cycle lookup
        const activeCycle =
          await promotionService.getActiveCycle();

        console.log("Active Cycle:", activeCycle);

        if (!activeCycle) {
          setLoading(false);
          return;
        }

        console.log("Step 3");

        // Keep existing promotion result
        const memberResult =
          await promotionService.getMemberResult(
            activeCycle.id,
            dashboardUser.id
          );

        console.log(
          "Stored Member Result:",
          memberResult
        );

        // ------------------------------------------------
        // LIVE DUTY DATA
        // ------------------------------------------------

        const dutyLogs =
          await promotionService.getDutyLogs(
            activeCycle.id
          );

        console.log(
          "Cycle Duty Logs:",
          dutyLogs
        );

        const memberDutyLogs =
          dutyLogs.filter(
            (log) =>
              log.member_id === dashboardUser.id
          );

        console.log(
          "Member Duty Logs:",
          memberDutyLogs
        );

        // Calculate current duty hours
        const totalHours =
          memberDutyLogs.reduce(
            (total, log) =>
              total +
              Number(log.duty_hours ?? 0),
            0
          );

        // Calculate unique duty days
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

        // ------------------------------------------------
        // Preserve promotion result but update live stats
        // ------------------------------------------------

        const liveResult =
          memberResult
            ? {
                ...memberResult,

                total_hours: Number(
                  totalHours.toFixed(2)
                ),

                duty_days: dutyDays,
              }
            : null;

        console.log(
          "Final Promotion Result:",
          liveResult
        );

        setCycle(activeCycle);
        setResult(liveResult);
      } catch (error) {
        console.error(
          "Promotion Hook Error:",
          error
        );
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