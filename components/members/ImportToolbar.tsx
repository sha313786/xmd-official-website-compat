"use client";

import { Upload, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImportToolbarProps {
  loading: boolean;

  importing: boolean;

  hasFile: boolean;

  canImport: boolean;

  selectedCount: number;

  totalCount: number;

  onPreview: () => Promise<void>;

  onImport: () => Promise<boolean>;

  onClear: () => void;

  onSelectAll: () => void;

  onClearSelection: () => void;
}

export function ImportToolbar({
  loading,
  importing,
  hasFile,
  canImport,
  selectedCount,
  totalCount,
  onPreview,
  onImport,
  onClear,
  onSelectAll,
  onClearSelection,
}: ImportToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">
          Import Actions
        </h3>

        <p className="text-sm text-muted-foreground">
          Preview, validate and import existing XMD
          members.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={
            !hasFile ||
            loading ||
            importing
          }
          onClick={onPreview}
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>

        <Button
          type="button"
          disabled={
            !canImport ||
            importing
          }
          onClick={onImport}
        >
          <Upload className="mr-2 h-4 w-4" />

          {importing
            ? "Importing..."
            : "Import Members"}
        </Button>

        <Button
          type="button"
          variant="destructive"
          disabled={
            !hasFile ||
            loading ||
            importing
          }
          onClick={onClear}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
            <div className="grid gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Total Members
          </p>

          <p className="text-2xl font-bold">
            {totalCount}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Selected
          </p>

          <p className="text-2xl font-bold">
            {selectedCount}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Status
          </p>

          <p className="text-sm font-medium">
            {!hasFile
              ? "Waiting for Excel file"
              : importing
              ? "Import in Progress"
              : loading
              ? "Processing Excel"
              : "Ready"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={
            !hasFile ||
            selectedCount ===
              totalCount
          }
          onClick={
            onSelectAll
          }
        >
          Select All
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={
            selectedCount === 0
          }
          onClick={
            onClearSelection
          }
        >
          Clear Selection
        </Button>

        <div className="ml-auto text-sm text-muted-foreground">
          {selectedCount} of{" "}
          {totalCount} member
          {totalCount !== 1
            ? "s"
            : ""}{" "}
          selected
        </div>
      </div>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <h4 className="mb-2 text-sm font-semibold">
          Import Workflow
        </h4>

        <ol className="space-y-1 text-sm text-muted-foreground">
          <li>
            1. Upload the exported Excel (.xlsx) file.
          </li>

          <li>
            2. Preview and validate the imported data.
          </li>

          <li>
            3. Review duplicate members and validation
            errors.
          </li>

          <li>
            4. Badge numbers are assigned automatically.
          </li>

          <li>
            5. Departments are assigned automatically
            based on rank.
          </li>

          <li>
            6. Click <strong>Import Members</strong> to
            create all valid members.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default ImportToolbar;