"use client";

import {
  ArrowRight,
  Award,
  TrendingUp,
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

interface PromotionTimelineCardProps {
  currentRank: string;

  nextRank: string | null;

  promotionType: MemberPromotionType;

  leaderboardPosition: number | null;

  progress: number;

  remainingHours: number;

  remainingDays: number;

  eligible: boolean;
}

export default function PromotionTimelineCard({
  currentRank,
  nextRank,
  promotionType,
  leaderboardPosition,
  progress,
  remainingHours,
  remainingDays,
  eligible,
}: PromotionTimelineCardProps) {
  const getPromotionLabel = () => {
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
  };

  const getPromotionVariant = () => {
    switch (promotionType) {
      case "DOUBLE":
      case "SINGLE":
        return "default";

      case "MANAGEMENT_REWARD":
        return "outline";

      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Promotion Timeline
        </CardTitle>

        <Badge
          variant={getPromotionVariant()}
        >
          {getPromotionLabel()}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">
              Current Rank
            </p>

            <p className="mt-2 text-xl font-bold">
              {currentRank}
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">
              Next Rank
            </p>

            <div className="mt-2 flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />

              <span className="text-xl font-bold">
                {nextRank ??
                  "No Promotion"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>
              Promotion Progress
            </span>

            <span>{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-muted/40 p-4">
            <TrendingUp className="mb-3 h-5 w-5" />

            <p className="text-sm text-muted-foreground">
              Remaining Hours
            </p>

            <p className="mt-2 text-2xl font-bold">
              {remainingHours}
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <Award className="mb-3 h-5 w-5" />

            <p className="text-sm text-muted-foreground">
              Remaining Days
            </p>

            <p className="mt-2 text-2xl font-bold">
              {remainingDays}
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <Trophy className="mb-3 h-5 w-5" />

            <p className="text-sm text-muted-foreground">
              Leaderboard
            </p>

            <p className="mt-2 text-2xl font-bold">
              {leaderboardPosition
                ? `#${leaderboardPosition}`
                : "--"}
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Current Status
              </p>

              <p className="mt-1 font-semibold">
                {eligible
                  ? "Ready For Promotion"
                  : "Promotion In Progress"}
              </p>
            </div>

            <Badge
              variant={
                eligible
                  ? "default"
                  : "secondary"
              }
            >
              {eligible
                ? "Eligible"
                : "Pending"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}