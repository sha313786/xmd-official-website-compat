"use client";

import { useEffect, useState } from "react";

import {
  PromotionCycle,
  PromotionResult,
} from "@/types/promotion";

import { createClient } from "@/lib/supabase/client";

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
    async function loadPromotion() {
      const supabase = createClient();

      try {
        setLoading(true);

        console.log(
          "========== MY PROMOTION =========="
        );

        // ============================================
        // 1. GET LOGGED-IN MEMBER
        // ============================================

        const dashboardUser =
          await DashboardRoleService.getDashboardUser();

        console.log(
          "[PROMOTION] Dashboard User:",
          dashboardUser
        );

        if (!dashboardUser) {
          console.error(
            "[PROMOTION] Member not found."
          );

          setCycle(null);
          setResult(null);
          return;
        }

        // ============================================
        // 2. GET ACTIVE PROMOTION CYCLE
        // ============================================

        const {
          data: activeCycle,
          error: cycleError,
        } = await supabase
          .from("promotion_cycles")
          .select("*")
          .eq("is_active", true)
          .single();

        console.log(
          "[PROMOTION] Active Cycle:",
          activeCycle
        );

        console.log(
          "[PROMOTION] Cycle Error:",
          cycleError
        );

        if (cycleError || !activeCycle) {
          console.error(
            "[PROMOTION] ACTIVE CYCLE NOT FOUND",
            cycleError
          );

          setCycle(null);
          setResult(null);
          return;
        }

        // ============================================
        // 3. SET CYCLE IMMEDIATELY
        // ============================================

        setCycle(
          activeCycle as PromotionCycle
        );

        // ============================================
        // 4. GET STORED PROMOTION RESULT
        //
        // Used for:
        // - leaderboard position
        // - promotion type
        // - promotion result
        // ============================================

        const {
          data: storedResult,
          error: resultError,
        } = await supabase
          .from("promotion_results")
          .select("*")
          .eq("cycle_id", activeCycle.id)
          .eq(
            "member_id",
            dashboardUser.id
          )
          .maybeSingle();

        console.log(
          "[PROMOTION] Stored Result:",
          storedResult
        );

        console.log(
          "[PROMOTION] Result Error:",
          resultError
        );

        // ============================================
        // 5. GET THIS MEMBER'S DUTY LOGS
        //
        // IMPORTANT:
        // duty_logs is now the source of truth
        // for current duty hours and duty days.
        // ============================================

        const {
          data: dutyLogs,
          error: dutyError,
        } = await supabase
          .from("duty_logs")
          .select(
            `
              id,
              member_id,
              cycle_id,
              duty_start,
              duty_end,
              duty_hours,
              normalized_duty_date
            `
          )
          .eq(
            "cycle_id",
            activeCycle.id
          )
          .eq(
            "member_id",
            dashboardUser.id
          )
          .order(
            "normalized_duty_date",
            {
              ascending: true,
            }
          );

        console.log(
          "[PROMOTION] Duty Logs:",
          dutyLogs
        );

        console.log(
          "[PROMOTION] Duty Error:",
          dutyError
        );

        if (dutyError) {
          throw dutyError;
        }

        // ============================================
        // 6. CALCULATE LIVE DUTY HOURS
        // ============================================

        const totalHours =
          (dutyLogs ?? []).reduce(
            (
              total,
              log
            ) =>
              total +
              Number(
                log.duty_hours ?? 0
              ),
            0
          );

        // ============================================
        // 7. CALCULATE LIVE DUTY DAYS
        // ============================================

        const dutyDays =
          new Set(
            (dutyLogs ?? [])
              .map(
                (log) =>
                  log.normalized_duty_date
              )
              .filter(Boolean)
          ).size;

        console.log(
          "[PROMOTION] LIVE DUTY HOURS:",
          totalHours
        );

        console.log(
          "[PROMOTION] LIVE DUTY DAYS:",
          dutyDays
        );

        // ============================================
        // 8. BUILD FINAL RESULT
        //
        // Keep promotion_results data for promotion
        // information, but ALWAYS replace duty stats
        // with current duty_logs values.
        // ============================================

        const finalResult = {
          ...(storedResult ?? {}),

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
          finalResult
        );

        setResult(finalResult);

        console.log(
          "=================================="
        );
      } catch (error) {
        console.error(
          "[PROMOTION] ERROR:",
          error
        );

        // IMPORTANT:
        // Do NOT destroy an already-loaded cycle
        // because a later request failed.
        setResult(null);
      } finally {
        setLoading(false);
      }
    }

    loadPromotion();
  }, []);

  return {
    cycle,
    result,
    loading,
  };
}