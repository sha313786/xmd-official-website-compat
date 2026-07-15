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
          <div className="space-y-2">
            <p className="font-semibold">
              {cycle.name}
            </p>

            <p className="text-sm text-muted-foreground">
              {cycle.start_date} → {cycle.end_date}
            </p>
          </div>
        ) : (
          <p>No active cycle.</p>
        )}
      </CardContent>
    </Card>
  );
}