"use client";

import { ManagementRouteGuard } from "@/components/shared/management-route-guard";

import { AddReportDialog } from "@/components/report/add-report-dialog";
import { ReportAnalytics } from "@/components/report/report-analytics";
import { ReportTable } from "@/components/report/report-table";

import { useReports } from "@/hooks";

export default function ReportsPage() {
  const {
    reports,
    loading,
    refresh,
    createReport,
    updateReport,
    deleteReport,
  } = useReports();

  return (
    <ManagementRouteGuard>
      <div className="space-y-8 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Reports Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage reports, review incidents, and track their progress.
            </p>
          </div>

          <AddReportDialog
            createReport={createReport}
            onCreated={refresh}
          />
        </div>

        <ReportAnalytics />

        {loading ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            Loading reports...
          </div>
        ) : (
          <ReportTable
            reports={reports}
            updateReport={updateReport}
            deleteReport={deleteReport}
            onUpdated={refresh}
          />
        )}
      </div>
    </ManagementRouteGuard>
  );
}