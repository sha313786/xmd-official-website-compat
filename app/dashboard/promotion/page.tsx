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
import { ManagementRewardsTable } from "@/components/promotion/management-rewards-table";
import { PromotionRefreshButton } from "@/components/promotion/promotion-refresh-button";
import { PromotionSummaryCard } from "@/components/promotion/promotion-summary-card";

export default function PromotionDashboardPage() {
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
            value="--"
            icon={Users}
            color="text-blue-500"
          />

          <PromotionSummaryCard
            title="Single Promotions"
            value="--"
            icon={Award}
            color="text-green-500"
          />

          <PromotionSummaryCard
            title="Double Promotions"
            value="--"
            icon={Trophy}
            color="text-yellow-500"
          />

          <PromotionSummaryCard
            title="Management Rewards"
            value="--"
            icon={ShieldCheck}
            color="text-red-500"
          />
        </div>

        <PromotionCycleCard />

        <div className="grid gap-6 xl:grid-cols-2">
          <PromotionLeaderboard />
          <EligibleMembersTable />
        </div>

        <ManagementRewardsTable />
      </div>
    </ManagementRouteGuard>
  );
}