"use client";

import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useActivePromotionCycle, usePromotionResults } from "@/hooks/usePromotion";

export function PromotionLeaderboard() {
  const { cycle } = useActivePromotionCycle();

  const { results, loading } = usePromotionResults(
    cycle?.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Promotion Leaderboard
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No promotion results available.
          </p>
        ) : (
          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    #{result.position}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Member ID: {result.member_id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {result.total_hours.toFixed(2)} hrs
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {result.duty_days} duty days
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}