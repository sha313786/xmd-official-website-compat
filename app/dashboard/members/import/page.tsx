"use client";

import { useState } from "react";

import {
  ExcelUploadCard,
} from "@/components/members/ExcelUploadCard";

import {
  ImportToolbar,
} from "@/components/members/ImportToolbar";

import {
  ImportMembersTable,
} from "@/components/members/ImportMembersTable";

import {
  ImportSummaryDialog,
} from "@/components/members/ImportSummaryDialog";

import {
  ImportHistoryTable,
} from "@/components/members/ImportHistoryTable";

import {
  useMemberImport,
} from "@/hooks/use-member-import";

export default function MemberImportPage() {
  const {
    members,

    validationErrors,

    summary,

    loading,

    importing,

    selectedRows,

    fileName,

    hasFile,

    canImport,

    uploadExcel,

    previewImport,

    importMembers,

    clearImport,

    toggleRow,

    selectAll,

    clearSelection,
  } = useMemberImport();

  const [
    summaryOpen,
    setSummaryOpen,
  ] = useState(false);

  const handleImport = async (): Promise<boolean> => {
    const success =
      await importMembers();

    if (success) {
      setSummaryOpen(true);
    }

    return success;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Existing Member Import
        </h1>

        <p className="mt-2 text-muted-foreground">
          Import existing XMD members
          from an Excel spreadsheet.
        </p>
      </div>

      <ExcelUploadCard
        loading={loading}
        fileName={fileName}
        onUpload={uploadExcel}
      />

      <ImportToolbar
        loading={loading}
        importing={importing}
        hasFile={hasFile}
        canImport={canImport}
        selectedCount={
          selectedRows.length
        }
        totalCount={
          members.length
        }
        onPreview={
          previewImport
        }
        onImport={
          handleImport
        }
        onClear={
          clearImport
        }
        onSelectAll={
          selectAll
        }
        onClearSelection={
          clearSelection
        }
      />

      {!hasFile ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">
            Ready to Import
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload an Excel (.xlsx) file exported from
            the Google Form to begin importing existing
            XMD members.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ImportMembersTable
              members={
                members
              }
              selectedRows={
                selectedRows
              }
              validationErrors={
                validationErrors
              }
              onToggleRow={
                toggleRow
              }
            />
          </div>

          <div className="space-y-6">
            <ImportHistoryTable
              history={[]}
              loading={false}
            />
          </div>
        </div>
      )}

      <ImportSummaryDialog
        open={
          summaryOpen
        }
        summary={
          summary
        }
        onOpenChange={
          setSummaryOpen
        }
      />
    </div>
  );
}