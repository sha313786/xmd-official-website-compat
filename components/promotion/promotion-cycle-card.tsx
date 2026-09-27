"use client";

import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useActivePromotionCycle } from "@/hooks/promotion/use-promotion-cycles"

export function PromotionCycleCard() {
  const { cycle, loading } =
    useActivePromotionCycle();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-red-500" />
          Active Promotion Cycle
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : cycle ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <p className="font-semibold text-lg">
                {cycle.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {cycle.start_date} → {cycle.end_date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg border bg-muted/40 px-3.5 py-2 text-center">
                <span className="text-xs text-muted-foreground block">
                  Minimum Duty Hours
                </span>
                <span className="text-base font-bold text-red-400">
                  {cycle.required_hours ?? 25} hrs
                </span>
              </div>

              <div className="rounded-lg border bg-muted/40 px-3.5 py-2 text-center">
                <span className="text-xs text-muted-foreground block">
                  Minimum Duty Days
                </span>
                <span className="text-base font-bold text-foreground">
                  {cycle.required_days ?? 0} days
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p>No active cycle.</p>
        )}
      </CardContent>
    </Card>
  );
}