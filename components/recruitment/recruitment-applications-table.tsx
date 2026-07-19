"use client";

import { useMemo, useState } from "react";

import {
  Filter,
  Eye,
  Check,
  X,
  FileText,
} from "lucide-react";

import { useApplications } from "@/hooks/use-applications";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ApplicationDetailsDialog,
} from "@/components/recruitment/application-details-dialog";

import {
  RecruitmentApplication,
} from "@/types/recruitment";

type StatusFilter =
  | "all"
  | "pending"
  | "approved"
  | "rejected";

export function RecruitmentApplicationsTable() {
  const {
    applications,
    loading,
    approveApplication,
    rejectApplication,
  } = useApplications();

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [
    selectedApplication,
    setSelectedApplication,
  ] =
    useState<RecruitmentApplication | null>(
      null
    );

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const filteredApplications =
    useMemo(() => {
      if (statusFilter === "all") {
        return applications;
      }

      return applications.filter(
        (application) =>
          application.status ===
          statusFilter
      );
    }, [
      applications,
      statusFilter,
    ]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading recruitment applications...
        </CardContent>
      </Card>
    );
  }
    if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading applications...
        </CardContent>
      </Card>
    );
  }

  return (
  <>
    <Card>

      <CardHeader className="space-y-5">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div className="space-y-2">

            <CardTitle className="text-xl">
              Recruitment Applications
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Review and manage submitted recruitment applications.
            </p>

          </div>

          <div className="flex items-center gap-2">

  <Badge
    variant="secondary"
    className="rounded-full px-3 py-1"
  >
    {filteredApplications.length} Application
    {filteredApplications.length !== 1 && "s"}
  </Badge>

</div>

        </div>

        <div className="flex items-center justify-between rounded-xl border bg-card p-4">

          <div className="flex items-center gap-2">

            <FileText className="h-8 w-8 text-muted-foreground" />

            <span className="text-sm font-medium">
              Status
            </span>

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as StatusFilter
              )
            }
            className="h-10 rounded-lg border bg-background px-4 text-sm"
          >
            <option value="all">
              All
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="rejected">
              Rejected
            </option>

          </select>

        </div>

      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto rounded-xl border">

          <table className="w-full border-collapse text-sm">

            <thead>

              <tr className="border-b bg-muted/60">

                <th className="px-4 py-3 text-left font-semibold">
                  Full Name
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Character Name
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Age
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Status
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Applied
                </th>

                <th className="px-4 py-3 text-right font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

  {filteredApplications.map((application) => (

    <tr
      key={application.id}
      className="border-b transition-colors hover:bg-muted/30"
    >

      <td className="px-4 py-4 font-medium whitespace-nowrap">
        {application.full_name}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {application.character_name}
      </td>

      <td className="px-4 py-4">
        {application.real_age}
      </td>

      <td className="px-4 py-4">

        <Badge
          variant={
            application.status === "approved"
              ? "default"
              : application.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </Badge>

      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {new Date(
          application.created_at
        ).toLocaleDateString()}
      </td>

      <td className="px-4 py-4">

        <div className="flex justify-end gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedApplication(application);
              setDialogOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            disabled={
              application.status === "approved"
            }
            onClick={() =>
              approveApplication(application.id)
            }
          >
            <Check className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="destructive"
            disabled={
              application.status === "rejected"
            }
            onClick={() =>
              rejectApplication(application.id)
            }
          >
            <X className="h-4 w-4" />
          </Button>

        </div>

      </td>

    </tr>

  ))}

  {filteredApplications.length === 0 && (

    <tr>

      <td
        colSpan={6}
        className="px-6 py-20 text-center"
      >

        <div className="mx-auto flex max-w-md flex-col items-center gap-4">

          <div className="rounded-full bg-muted p-4">

  <FileText className="h-8 w-8 text-muted-foreground" />

</div>

          <h3 className="text-xl font-semibold">
            No recruitment applications yet
          </h3>

         <p className="max-w-md text-sm text-muted-foreground">
            Applications submitted through the public
            recruitment page will appear here.
          </p>

        </div>

      </td>

    </tr>

  )}

            </tbody>

          </table>

        </div>

      </CardContent>

    </Card>

    <ApplicationDetailsDialog
      application={selectedApplication}
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    />

  </>
);
}