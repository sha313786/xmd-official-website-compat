"use client";

import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  useActivePromotionCycle,
  usePromotionResults,
} from "@/hooks/promotion/use-promotion-cycles";

export function PromotionLeaderboard() {
  const { cycle } = useActivePromotionCycle();

  const { results, loading } = usePromotionResults(
    cycle?.id
  );

  function getBadge(type: string) {
    switch (type) {
      case "DOUBLE":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-500 text-black">
            🏆 DOUBLE PROMOTION
          </Badge>
        );

      case "SINGLE":
        return (
          <Badge className="bg-green-600 hover:bg-green-600">
            SINGLE PROMOTION
          </Badge>
        );

      case "MANAGEMENT_REWARD":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-600">
            MANAGEMENT REWARD
          </Badge>
        );

      default:
        return (
          <Badge variant="secondary">
            NOT ELIGIBLE
          </Badge>
        );
    }
  }

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
                  <p className="font-semibold text-lg">
                    #{result.position}
                  </p>

                  <p className="font-medium">
                    {result.full_name ?? "Unknown Member"}
                  </p>

                  <div className="mt-2">
                    {getBadge(result.promotion_type)}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {result.total_hours.toFixed(2)} hrs
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {result.duty_days} Duty Days
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