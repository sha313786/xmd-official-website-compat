"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ShieldCheck } from "lucide-react";

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
      member.promotion_type ===
      "MANAGEMENT_REWARD"
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
                  <p className="font-medium">
                    Member ID: {member.member_id}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {member.current_rank}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {member.total_hours.toFixed(2)} hrs
                  </p>

                  <p className="text-sm text-blue-600 font-medium">
                    Reward
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