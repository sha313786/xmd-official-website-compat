"use client";

import { Report } from "@/types";

import { ViewReportDialog } from "./view-report-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EditReportDialog } from "./edit-report-dialog";

import { DeleteReportDialog } from "./delete-report-dialog";

interface ReportTableProps {
  reports: Report[];

  updateReport: (
    id: string,
    updates: Partial<Report>
  ) => Promise<Report>;

  deleteReport: (id: string) => Promise<void>;

  onUpdated: () => void;
}
export function ReportTable({
  reports,
  updateReport,
  deleteReport,
  onUpdated,
}: ReportTableProps) {
  if (reports.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        No reports found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
  <TableCell className="font-medium">
    {report.title}
  </TableCell>

  <TableCell>
    {report.memberName}
  </TableCell>

  <TableCell>
    {report.reportType}
  </TableCell>

  <TableCell>
    {report.priority}
  </TableCell>

  <TableCell>
    {report.status}
  </TableCell>

  <TableCell>
    {report.createdBy}
  </TableCell>

  <TableCell className="text-right">
    <div className="flex justify-end gap-2">
      <ViewReportDialog report={report} />

      <EditReportDialog
        report={report}
        updateReport={updateReport}
        onUpdated={onUpdated}
      />

      <DeleteReportDialog
        reportId={report.id}
        reportTitle={report.title}
        deleteReport={deleteReport}
        onDeleted={onUpdated}
      />
    </div>
  </TableCell>
</TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}