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

    const approvalRate =
      total === 0
        ? 0
        : Math.round((approved / total) * 100);

    const averageAge =
      total === 0
        ? 0
        : Math.round(
            applications.reduce(
              (sum, application) =>
                sum + application.age,
              0
            ) / total
          );

    return {
      total,
      pending,
      approved,
      rejected,
      approvalRate,
      averageAge,
    };
  }, [applications]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">

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

      <RecruitmentStatCard
        title="Approval Rate %"
        value={analytics.approvalRate}
        icon={Percent}
        color="bg-violet-500"
      />

      <RecruitmentStatCard
        title="Average Age"
        value={analytics.averageAge}
        icon={Cake}
        color="bg-orange-500"
      />

    </div>
  );
}