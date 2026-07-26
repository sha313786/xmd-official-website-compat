"use client";

import { useMemo } from "react";

import { useApplications } from "@/hooks/use-applications";

import { RecruitmentStatCard } from "@/components/recruitment/recruitment-stat-card";

import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  Percent,
  Cake,
} from "lucide-react";

export function RecruitmentAnalytics() {
  const { applications } = useApplications();

  const analytics = useMemo(() => {
    const total = applications.length;

    const pending = applications.filter(
      (a) => a.status === "pending"
    ).length;

    const approved = applications.filter(
      (a) => a.status === "approved"
    ).length;

    const rejected = applications.filter(
      (a) => a.status === "rejected"
    ).length;

    return {
      total,
      pending,
      approved,
      rejected,
    };
  }, [applications]);

  return (
  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

      <RecruitmentStatCard
        title="Total Applications"
        value={analytics.total}
        icon={Users}
        color="bg-blue-500"
      />

      <RecruitmentStatCard
        title="Pending Review"
        value={analytics.pending}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <RecruitmentStatCard
        title="Approved"
        value={analytics.approved}
        icon={CheckCircle2}
        color="bg-green-500"
      />

      <RecruitmentStatCard
        title="Rejected"
        value={analytics.rejected}
        icon={XCircle}
        color="bg-red-500"
      />
  
    </div>
  );
}