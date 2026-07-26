"use client";

import { useMemo } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useApplications } from "@/hooks/use-applications";

const COLORS = [
  "#22c55e", // Approved
  "#eab308", // Pending
  "#ef4444", // Rejected
];

export function RecruitmentStatusChart() {
  const { applications } = useApplications();

  const data = useMemo(() => {
    const approved = applications.filter(
      (a) => a.status === "approved"
    ).length;

    const pending = applications.filter(
      (a) => a.status === "pending"
    ).length;

    const rejected = applications.filter(
      (a) => a.status === "rejected"
    ).length;

    return [
      {
        name: "Approved",
        value: approved,
      },
      {
        name: "Pending",
        value: pending,
      },
      {
        name: "Rejected",
        value: rejected,
      },
    ];
  }, [applications]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recruitment Status
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
  {applications.length === 0 ? (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      No recruitment applications yet.
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={4}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )}
</CardContent>
    </Card>
  );
}