"use client";

import {
  CalendarRange,
  CheckCircle2,
  Clock3,
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PromotionCycleStatsProps {
  totalCycles: number;
  activeCycles: number;
  completedCycles: number;
  upcomingCycles: number;
}

export function PromotionCycleStats({
  totalCycles,
  activeCycles,
  completedCycles,
  upcomingCycles,
}: PromotionCycleStatsProps) {
  const stats = [
    {
      title: "Total Cycles",
      value: totalCycles,
      icon: CalendarRange,
    },
    {
      title: "Active",
      value: activeCycles,
      icon: Clock3,
    },
    {
      title: "Completed",
      value: completedCycles,
      icon: CheckCircle2,
    },
    {
      title: "Upcoming",
      value: upcomingCycles,
      icon: Trophy,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
