"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { dutyHours } from "@/data/duty-hours";

export function DutyHoursChart() {
  return (
    <Card className="min-h-[320px] border-white/10 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle>Monthly Duty Hours</CardTitle>
      </CardHeader>

      <CardContent className="h-80 pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dutyHours}>
            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="hours"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}