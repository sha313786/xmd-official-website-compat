"use client";

import { useMemo } from "react";

import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useApplications } from "@/hooks/use-applications";

import { RecruitmentStatCard } from "./recruitment-stat-card";

export function RecruitmentStatistics() {
  const { applications } = useApplications();

  const stats = useMemo(() => {
    const total = applications.length;

    const pending = applications.filter(
      (application) =>
        application.status === "pending"
    ).length;

    const approved = applications.filter(
      (application) =>
        application.status === "approved"
    ).length;

    const rejected = applications.filter(
      (application) =>
        application.status === "rejected"
    ).length;

    return {
      total,
      pending,
      approved,
      rejected,
    };
  }, [applications]);

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