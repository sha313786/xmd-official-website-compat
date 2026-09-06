"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { medicalReportService } from "@/services/medical-report.service";

interface AddReportDialogProps {
  patientId: string;
  onSuccess?: () => void;
}

export function AddReportDialog({
  patientId,
  onSuccess,
}: AddReportDialogProps) {
  const [open, setOpen] = useState(false);

  const [reportName, setReportName] =
    useState("");

  const [reportType, setReportType] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function resetForm() {
    setReportName("");
    setReportType("");
    setDescription("");
    setFile(null);
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!reportName.trim()) {
      setError("Report name is required.");
      return;
    }

    if (!file) {
      setError("Please select a PDF report.");
      return;
    }

    try {
      setLoading(true);

      await medicalReportService.create({
        patientId,
        reportName,
        reportType,
        description,
        file,
      });

      resetForm();
      setOpen(false);

      onSuccess?.();
    } catch (error) {
      console.error(
        "MEDICAL REPORT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload report."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
      >
        + Add Report
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!loading) {
            setOpen(value);

            if (!value) {
              resetForm();
            }
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Add Medical Report
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Report Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Report Name
              </label>

              <Input
                value={reportName}
                onChange={(event) =>
                  setReportName(
                    event.target.value
                  )
                }
                placeholder="Blood Test Report"
                disabled={loading}
              />
            </div>

            {/* Report Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Report Type
              </label>

              <Input
                value={reportType}
                onChange={(event) =>
                  setReportType(
                    event.target.value
                  )
                }
                placeholder="Blood Test, X-Ray, Scan..."
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="Optional description"
                disabled={loading}
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            {/* File */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Medical Report PDF
              </label>

              <Input
                type="file"
                accept="application/pdf,.pdf"
                disabled={loading}
                onChange={(event) => {
                  const selectedFile =
                    event.target.files?.[0] ??
                    null;

                  setFile(selectedFile);
                }}
              />

              <p className="text-xs text-slate-400">
                PDF only. Maximum size: 10 MB.
              </p>

              {file && (
                <p className="text-sm text-slate-300">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Uploading..."
                : "Upload Report"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}