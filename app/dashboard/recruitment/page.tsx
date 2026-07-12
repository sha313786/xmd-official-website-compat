"use client";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";

import { RecruitmentAnalytics } from "@/components/recruitment/recruitment-analytics";
import { RecruitmentApplicationsTable } from "@/components/recruitment/recruitment-applications-table";
import { RecruitmentMonthlyChart } from "@/components/recruitment/recruitment-monthly-chart";
import { RecruitmentStatusChart } from "@/components/recruitment/recruitment-status-chart";

export default function RecruitmentPage() {
  const {
    loading,
    isManagement,
  } = useDashboardRole();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading recruitment dashboard...
      </div>
    );
  }

  if (!isManagement) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Access Denied
          </h2>

          <p className="text-muted-foreground">
            You do not have permission to access the Recruitment Dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Recruitment Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage recruitment applications, review candidates,
          and monitor recruitment progress.
        </p>
      </div>

      <RecruitmentAnalytics />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecruitmentStatusChart />
        <RecruitmentMonthlyChart />
      </div>

      <RecruitmentApplicationsTable />
    </div>
  );
}