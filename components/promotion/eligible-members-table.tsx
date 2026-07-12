"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BadgeCheck } from "lucide-react";

import {
  useActivePromotionCycle,
  usePromotionResults,
} from "@/hooks/usePromotion";

export function EligibleMembersTable() {
  const { cycle } = useActivePromotionCycle();

  const { results, loading } = usePromotionResults(
    cycle?.id
  );

  const eligible = results.filter(
    (member) => member.eligible
  );

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

                  <p className="text-sm text-green-600 font-medium">
                    {member.promotion_type}
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