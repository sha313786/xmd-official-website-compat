"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  useActivePromotionCycle,
  usePromotionResults,
} from "@/hooks/promotion/use-promotion-cycles";

export function EligibleMembersTable() {
  const { cycle } = useActivePromotionCycle();

  const { results, loading } = usePromotionResults(
    cycle?.id
  );

  const eligible = results.filter(
    (member) => member.eligible
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

      default:
        return (
          <Badge variant="secondary">
            ELIGIBLE
          </Badge>
        );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-green-500" />
          Eligible Members
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : eligible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No eligible members.
          </p>
        ) : (
          <div className="space-y-3">
            {eligible.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-semibold">
                    {member.full_name ?? "Unknown Member"}
                  </p>

                  <div className="mt-2">
                    {getBadge(member.promotion_type)}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {member.total_hours.toFixed(2)} hrs
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {member.duty_days} Duty Days
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