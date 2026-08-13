"use client";

import { ChangeEvent, useRef } from "react";

import { Upload, FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ExcelUploadCardProps {
  loading: boolean;

  fileName: string | null;

  onUpload: (
    file: File,
  ) => Promise<boolean>;
}

export function ExcelUploadCard({
  loading,
  fileName,
  onUpload,
}: ExcelUploadCardProps) {
  const inputRef =
    useRef<HTMLInputElement>(
      null,
    );

  const handleBrowse =
    () => {
      inputRef.current?.click();
    };

  const handleFileChange =
    async (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      await onUpload(file);

      event.target.value = "";
    };

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Import Existing Members
            </h3>

            <p className="text-sm text-muted-foreground">
              Upload a Microsoft Excel (.xlsx)
              file exported from the
              existing Google Form.
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={
            handleFileChange
          }
        />

        <Button
          type="button"
          disabled={loading}
          onClick={
            handleBrowse
          }
          className="w-fit"
        >
          <Upload className="mr-2 h-4 w-4" />

          {loading
            ? "Uploading..."
            : "Choose Excel File"}
        </Button>
                <div className="rounded-lg border border-dashed p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Selected File
            </span>

            <span className="text-sm text-muted-foreground break-all">
              {fileName ??
                "No Excel file selected"}
            </span>
          </div>
        </div>

        <div className="grid gap-3 rounded-lg bg-muted/40 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span>
              Supported Format
            </span>

            <span className="font-medium">
              .xlsx / .xls
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>
              Source
            </span>

            <span className="font-medium">
              Google Form Export
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>
              Required Columns
            </span>

            <span className="font-medium">
              5 Required
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>
              Join Date
            </span>

            <span className="font-medium">
              Optional
            </span>
          </div>
        </div>

        {fileName && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm font-medium text-green-600">
              Excel file loaded successfully.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              You can now preview and validate the
              imported members before creating them.
            </p>
          </div>
        )}
                <div className="rounded-lg border bg-muted/30 p-5">
          <h4 className="mb-3 text-sm font-semibold">
            Excel Requirements
          </h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Export responses from the Google Form as a
              <strong> Microsoft Excel (.xlsx)</strong> file.
            </li>

            <li>
              • Do not rename or remove any required
              columns.
            </li>

            <li>
              • Required columns:
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-md bg-background p-3 text-xs">
                <span>• Timestamp</span>
                <span>• Character Name</span>
                <span>• Discord Username</span>
                <span>• Discord ID</span>
                <span>• Current Rank</span>
                <span>• Join Date (Optional)</span>
              </div>
            </li>

            <li>
              • Badge Numbers are generated
              automatically.
            </li>

            <li>
              • Department is assigned automatically
              based on the member's rank.
            </li>

            <li>
              • Existing Discord IDs and Character Names
              are automatically skipped.
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
          <p className="text-sm font-medium text-blue-600">
            Migration Tool
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            This tool is intended for importing existing
            XMD members from the legacy Google Form into
            the Member Management System.
          </p>
        </div>
              </div>
    </Card>
  );
}

export default ExcelUploadCard;