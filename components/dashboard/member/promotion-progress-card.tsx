"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface PromotionProgressCardProps {
  dutyHours: number;
  dutyDays: number;

  remainingHours: number;
  remainingDays: number;

  progress: number;

  cycleName: string;

  eligible: boolean;
}

export default function PromotionProgressCard({
  dutyHours,
  dutyDays,
  remainingHours,
  remainingDays,
  progress,
  cycleName,
  eligible,
}: PromotionProgressCardProps) {
  const requiredHours =
    dutyHours + remainingHours;

  const requiredDays =
    dutyDays + remainingDays;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>
          Promotion Progress
        </CardTitle>

        <Badge
          variant={
            eligible
              ? "default"
              : "secondary"
          }
        >
          {eligible
            ? "Eligible"
            : "In Progress"}
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

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>
              Overall Progress
            </span>

            <span className="font-medium">
              {progress}%
            </span>
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

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Duty Hours
            </p>

            <p className="mt-2 text-2xl font-bold">
              {dutyHours}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / {requiredHours}
              </span>
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Duty Days
            </p>

            <p className="mt-2 text-2xl font-bold">
              {dutyDays}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / {requiredDays}
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              Remaining Hours
            </p>

            <p className="mt-2 text-xl font-semibold">
              {remainingHours}
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              Remaining Days
            </p>

            <p className="mt-2 text-xl font-semibold">
              {remainingDays}
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Promotion Status
              </p>

              <p className="mt-1 font-semibold">
                {eligible
                  ? "Ready for Promotion"
                  : "Promotion Requirements In Progress"}
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