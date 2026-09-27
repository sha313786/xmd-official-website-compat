"use client";

import Link from "next/link";

import {
  Award,
  ShieldCheck,
  Trophy,
  Users,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { ManagementRouteGuard } from "@/components/shared/management-route-guard";

import { PromotionCycleCard } from "@/components/promotion/promotion-cycle-card";
import { PromotionLeaderboard } from "@/components/promotion/promotion-leaderboard";
import { EligibleMembersTable } from "@/components/promotion/eligible-members-table";
import { ManagementRolesTable } from "@/components/promotion/management-rewards-table";
import { PromotionRefreshButton } from "@/components/promotion/promotion-refresh-button";
import { PromotionSummaryCard } from "@/components/promotion/promotion-summary-card";
import {
  useActivePromotionCycle,
  usePromotionResults,
} from "@/hooks/promotion/use-promotion-cycles";

export default function PromotionDashboardPage() {
  const { cycle } = useActivePromotionCycle();
  const { results, loading } = usePromotionResults(cycle?.id);

  const eligibleCount = loading
    ? "--"
    : results.filter((r) => r.eligible).length;

  const singleCount = loading
    ? "--"
    : results.filter((r) => r.promotion_type === "SINGLE").length;

  const doubleCount = loading
    ? "--"
    : results.filter((r) => r.promotion_type === "DOUBLE").length;

  const managementCount = loading
    ? "--"
    : results.filter(
        (r) => r.promotion_type === "MANAGEMENT_REWARD"
      ).length;

  return (
    <ManagementRouteGuard>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Promotion Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Calculate and review promotion results.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/promotion-cycles">
              <Button
                variant="outline"
                className="gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Manage Promotion Cycles
              </Button>
            </Link>

            <PromotionRefreshButton />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <PromotionSummaryCard
            title="Eligible Members"
            value={eligibleCount}
            icon={Users}
            color="text-blue-500"
          />

          <PromotionSummaryCard
            title="Single Promotions"
            value={singleCount}
            icon={Award}
            color="text-green-500"
          />

          <PromotionSummaryCard
            title="Double Promotions"
            value={doubleCount}
            icon={Trophy}
            color="text-yellow-500"
          />

          <PromotionSummaryCard
            title="Management Roles"
            value={managementCount}
            icon={ShieldCheck}
            color="text-red-500"
          />
        </div>

        <PromotionCycleCard />

        <div className="grid gap-6 xl:grid-cols-2">
          <PromotionLeaderboard />
          <EligibleMembersTable />
        </div>

        <ManagementRolesTable  />
      </div>
    </ManagementRouteGuard>
  );
}