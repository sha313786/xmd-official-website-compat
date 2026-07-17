"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  useActivePromotionCycle,
  usePromotionResults,
} from "@/hooks/promotion/use-promotion-cycles";

export function ManagementRewardsTable() {
  const { cycle } = useActivePromotionCycle();

  const { results, loading } = usePromotionResults(
    cycle?.id
  );

  const rewards = results.filter(
    (member) =>
      member.promotion_type === "MANAGEMENT_REWARD"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-500" />
          Management Rewards
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : rewards.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No management rewards.
          </p>
        ) : (
          <div className="space-y-3">
            {rewards.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-semibold">
                    {member.full_name ?? "Unknown Member"}
                  </p>

                  <div className="mt-2">
                    <Badge className="bg-blue-600 hover:bg-blue-600">
                      MANAGEMENT REWARD
                    </Badge>
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