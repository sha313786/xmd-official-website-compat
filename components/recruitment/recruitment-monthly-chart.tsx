"use client";

import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { applicationService } from "@/services";

interface MonthlyApplicationData {
  month: string;
  applications: number;
}

export function RecruitmentMonthlyChart() {
  const [data, setData] = useState<MonthlyApplicationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        setLoading(true);

        const monthlyData =
          await applicationService.getMonthlyApplications();

        setData(monthlyData);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  return (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Applications by Month</CardTitle>
    </CardHeader>

    <CardContent className="h-[320px]">
      {loading ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No recruitment applications yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="applications"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </CardContent>
  </Card>
);
}