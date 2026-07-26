"use client";

import {
  Bell,
  Clock3,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { MemberActivity } from "@/types/member-dashboard";

interface RecentActivityProps {
  activities: MemberActivity[];
}

function getActivityIcon(type: MemberActivity["type"]) {
  switch (type) {
    case "DUTY_STARTED":
    case "DUTY_ENDED":
      return Clock3;

    case "PROMOTION":
      return TrendingUp;

    case "NOTIFICATION":
      return Bell;

    default:
      return ShieldCheck;
  }
}

function getActivityVariant(type: MemberActivity["type"]) {
  switch (type) {
    case "PROMOTION":
      return "default";

    case "NOTIFICATION":
      return "secondary";

    default:
      return "outline";
  }
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No recent activity found.
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(
                activity.type
              );

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className="rounded-full bg-muted p-2">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <h4 className="font-semibold">
                        {activity.title}
                      </h4>

                      <Badge
                        variant={getActivityVariant(
                          activity.type
                        )}
                      >
                        {activity.type.replaceAll(
                          "_",
                          " "
                        )}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}