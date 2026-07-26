"use client";

import {
  ArrowRight,
  Award,
 Clock,
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { MemberPromotionType } from "@/types/member-dashboard";

interface PromotionOverviewCardProps {
  cycleName: string;

  currentRank: string;

  nextRank: string | null;

  dutyHours: number;
  dutyDays: number;

  remainingHours: number;
  remainingDays: number;

  progress: number;

  leaderboardPosition: number | null;

  promotionType: MemberPromotionType;

  eligible: boolean;
}

export default function PromotionOverviewCard({
  cycleName,
  currentRank,
  nextRank,
  dutyHours,
  dutyDays,
  remainingHours,
  remainingDays,
  progress,
  leaderboardPosition,
  promotionType,
  eligible,
}: PromotionOverviewCardProps) {
  const requiredHours = dutyHours + remainingHours;
  const requiredDays = dutyDays + remainingDays;

  const promotionLabel = (() => {
    switch (promotionType) {
      case "DOUBLE":
        return "Double Promotion";
      case "SINGLE":
        return "Single Promotion";
      case "MANAGEMENT_REWARD":
        return "Management Reward";
      default:
        return "Not Eligible";
    }
  })();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Promotion Overview
        </CardTitle>

        <Badge
          variant={
            eligible
              ? "default"
              : "secondary"
          }
        >
          {eligible ? "Eligible" : "Pending"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Current Promotion Cycle
          </p>

          <p className="mt-1 text-lg font-semibold">
            {cycleName || "No Active Cycle"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">
              Current Rank
            </p>

            <p className="mt-2 font-semibold">
              {currentRank}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">
              Next Rank
            </p>

            <div className="mt-2 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              <span className="font-semibold">
                {nextRank ?? "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-muted/40 p-4">
            <Clock className="mb-2 h-4 w-4" />

            <p className="text-xs text-muted-foreground">
              Duty Hours
            </p>

            <p className="mt-1 text-xl font-bold">
              {dutyHours}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / {requiredHours}
              </span>
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <Award className="mb-2 h-4 w-4" />

            <p className="text-xs text-muted-foreground">
              Duty Days
            </p>

            <p className="mt-1 text-xl font-bold">
              {dutyDays}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / {requiredDays}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">
              Remaining
            </p>

            <p className="mt-2 font-semibold">
              {remainingHours} hrs
            </p>

            <p className="text-sm text-muted-foreground">
              {remainingDays} days
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <Trophy className="mb-2 h-4 w-4" />

            <p className="text-xs text-muted-foreground">
              Leaderboard
            </p>

            <p className="mt-2 text-xl font-bold">
              {leaderboardPosition
                ? `#${leaderboardPosition}`
                : "--"}
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Promotion Result
            </span>

            <Badge variant="outline">
              {promotionLabel}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}