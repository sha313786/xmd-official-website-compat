"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useApplications } from "@/hooks/use-applications";

import { RecruitmentStatCard } from "./recruitment-stat-card";

interface RecruitmentStatisticsData {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export function RecruitmentStatistics() {
  const { getStatistics } = useApplications();

  const [stats, setStats] =
    useState<RecruitmentStatisticsData>({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data =
          await getStatistics();

        setStats(data);
      } catch (error) {
        console.error(
          "Failed to load recruitment statistics:",
          error
        );
      }
    };

    loadStatistics();
  }, [getStatistics]);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <RecruitmentStatCard
        title="Total Applications"
        value={stats.total}
        icon={Users}
        color="bg-blue-500"
      />

      <RecruitmentStatCard
        title="Pending"
        value={stats.pending}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <RecruitmentStatCard
        title="Approved"
        value={stats.approved}
        icon={CheckCircle2}
        color="bg-green-500"
      />

      <RecruitmentStatCard
        title="Rejected"
        value={stats.rejected}
        icon={XCircle}
        color="bg-red-500"
      />

    </div>
  );
}