"use client";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";

import { RecruitmentApplicationsTable } from "@/components/recruitment/recruitment-applications-table";

export default function RecruitmentApplicationsPage() {
  const {
    loading,
    isManagement,
  } = useDashboardRole();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading recruitment applications...
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
            You do not have permission to access Recruitment Applications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Recruitment Applications
        </h1>

        <p className="mt-2 text-muted-foreground">
          Review, approve and manage recruitment applications.
        </p>
      </div>

      <RecruitmentApplicationsTable />
    </div>
  );
}