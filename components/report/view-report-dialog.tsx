"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import { Report } from "@/types";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewReportDialogProps {
  report: Report;
}

export function ViewReportDialog({
  report,
}: ViewReportDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <Eye className="mr-2 h-4 w-4" />
        View
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Report Details
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-sm text-muted-foreground">
                Title
              </p>

              <p className="font-medium">
                {report.title}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Member
              </p>

              <p className="font-medium">
                {report.memberName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Type
              </p>

              <p>{report.reportType}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Priority
              </p>

              <p>{report.priority}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <p>{report.status}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Assigned To
              </p>

              <p>{report.assignedTo || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Created By
              </p>

              <p>{report.createdBy}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Created At
              </p>

              <p>
                {new Date(
                  report.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">
                Description
              </p>

              <div className="mt-2 whitespace-pre-wrap rounded-lg border p-4">
                {report.description}
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}