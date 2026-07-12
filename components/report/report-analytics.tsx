"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

import { RecruitmentStatCard } from "@/components/recruitment/recruitment-stat-card";
import { useReports } from "@/hooks";

export function ReportAnalytics() {
  const { reports } = useReports();

  const total = reports.length;

  const open = reports.filter(
    (report) => report.status === "Open"
  ).length;

  const inProgress = reports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const resolved = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <RecruitmentStatCard
        title="Total Reports"
        value={total}
        icon={FileText}
        color="bg-blue-500"
      />

      <RecruitmentStatCard
        title="Open"
        value={open}
        icon={AlertCircle}
        color="bg-yellow-500"
      />

      <RecruitmentStatCard
        title="In Progress"
        value={inProgress}
        icon={Clock3}
        color="bg-orange-500"
      />

      <RecruitmentStatCard
        title="Resolved"
        value={resolved}
        icon={CheckCircle2}
        color="bg-green-500"
      />
    </div>
  );
}