"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface LiveDutySummaryProps {
  dutyHours: number;
  dutyDays: number;

  remainingHours: number;
  remainingDays: number;

  progress: number;

  lastDuty: string | null;

  isOnDuty: boolean;

  cycleName: string;

  eligible: boolean;
}

export default function LiveDutySummary({
  dutyHours,
  dutyDays,

  remainingHours,
  remainingDays,

  progress,

  lastDuty,

  isOnDuty,

  cycleName,

  eligible,
}: LiveDutySummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Live Duty Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Duty Hours
            </p>

            <p className="text-2xl font-bold">
              {dutyHours}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Duty Days
            </p>

            <p className="text-2xl font-bold">
              {dutyDays}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Remaining Hours
            </p>

            <p className="text-2xl font-bold">
              {remainingHours}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Remaining Days
            </p>

            <p className="text-2xl font-bold">
              {remainingDays}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Promotion Progress</span>

            <span>{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Promotion Cycle
            </p>

            <p className="font-medium">
              {cycleName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Last Duty
            </p>

            <p className="font-medium">
              {lastDuty
                ? new Date(
                    lastDuty
                  ).toLocaleString()
                : "No duty recorded"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Current Status
            </p>

            <Badge
              variant={
                isOnDuty
                  ? "default"
                  : "secondary"
              }
            >
              {isOnDuty
                ? "On Duty"
                : "Off Duty"}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Promotion
            </p>

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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}