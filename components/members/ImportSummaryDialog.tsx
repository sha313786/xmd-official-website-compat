"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Users,
  XCircle,
} from "lucide-react";

import type {
  ImportSummary,
} from "@/types/member-import";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Badge,
} from "@/components/ui/badge";

interface ImportSummaryDialogProps {
  open: boolean;

  summary: ImportSummary | null;

  onOpenChange: (
    open: boolean,
  ) => void;
}

export function ImportSummaryDialog({
  open,
  summary,
  onOpenChange,
}: ImportSummaryDialogProps) {
  if (!summary) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Import Summary
          </DialogTitle>

          <DialogDescription>
            Review the results of the member
            import before closing this dialog.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-primary" />

              <Badge>
                Total
              </Badge>
            </div>

            <p className="mt-4 text-3xl font-bold">
              {summary.processed}
            </p>

            <p className="text-sm text-muted-foreground">
              Members Processed
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <Badge>
                Imported
              </Badge>
            </div>

            <p className="mt-4 text-3xl font-bold text-green-600">
              {summary.imported}
            </p>

            <p className="text-sm text-muted-foreground">
              Successfully Imported
            </p>
          </div>
                    <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <XCircle className="h-5 w-5 text-red-600" />

              <Badge variant="destructive">
                Skipped
              </Badge>
            </div>

            <p className="mt-4 text-3xl font-bold text-red-600">
              {summary.skipped}
            </p>

            <p className="text-sm text-muted-foreground">
              Members Skipped
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />

              <Badge variant="secondary">
                Issues
              </Badge>
            </div>

            <p className="mt-4 text-3xl font-bold text-yellow-600">
              {summary.duplicateMembers +
                summary.duplicateDiscordIds +
                summary.invalidRanks +
                summary.invalidDiscordIds +
                summary.invalidJoinDates +
                summary.missingFields}
            </p>

            <p className="text-sm text-muted-foreground">
              Validation Issues
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border">
          <div className="border-b px-4 py-3">
            <h3 className="font-semibold">
              Validation Summary
            </h3>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">
                Duplicate Members
              </span>

              <Badge variant="outline">
                {summary.duplicateMembers}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">
                Duplicate Discord IDs
              </span>

              <Badge variant="outline">
                {summary.duplicateDiscordIds}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">
                Invalid Ranks
              </span>

              <Badge variant="outline">
                {summary.invalidRanks}
              </Badge>
            </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">
                Invalid Discord IDs
              </span>

              <Badge variant="outline">
                {summary.invalidDiscordIds}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">
                Invalid Join Dates
              </span>

              <Badge variant="outline">
                {summary.invalidJoinDates}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">
                Missing Required Fields
              </span>

              <Badge variant="outline">
                {summary.missingFields}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <h4 className="mb-2 font-semibold">
            Import Result
          </h4>

          <p className="text-sm text-muted-foreground">
            Successfully imported{" "}
            <strong>{summary.imported}</strong>{" "}
            of{" "}
            <strong>{summary.processed}</strong>{" "}
            members.
            {summary.skipped > 0 && (
              <>
                {" "}
                <strong>{summary.skipped}</strong>{" "}
                member
                {summary.skipped !== 1
                  ? "s were"
                  : " was"}{" "}
                skipped because of validation
                errors or duplicate records.
              </>
            )}
          </p>
        </div>
                <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() =>
              onOpenChange(false)
            }
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImportSummaryDialog;