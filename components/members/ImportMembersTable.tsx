"use client";

import {
  Check,
  AlertTriangle,
} from "lucide-react";

import type {
  GoogleFormMember,
  ImportValidationError,
} from "@/types/member-import";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Checkbox,
} from "@/components/ui/checkbox";

import {
  Badge,
} from "@/components/ui/badge";

interface ImportMembersTableProps {
  members: GoogleFormMember[];

  selectedRows: number[];

  validationErrors: ImportValidationError[];

  onToggleRow: (
    rowNumber: number,
  ) => void;
}

export function ImportMembersTable({
  members,
  selectedRows,
  validationErrors,
  onToggleRow,
}: ImportMembersTableProps) {
  const getErrors = (
    rowNumber: number,
  ) =>
    validationErrors.filter(
      (error) =>
        error.rowNumber ===
        rowNumber,
    );

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              Select
            </TableHead>

            <TableHead>
              Character Name
            </TableHead>

            <TableHead>
              Discord
            </TableHead>

            <TableHead>
              Discord ID
            </TableHead>

            <TableHead>
              Rank
            </TableHead>

            <TableHead>
              Join Date
            </TableHead>

            <TableHead>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
                      {members.map((member) => {
            const errors =
              getErrors(
                member.rowNumber,
              );

            const hasErrors =
              errors.length > 0;

            const selected =
              selectedRows.includes(
                member.rowNumber,
              );

            return (
              <TableRow
                key={
                  member.rowNumber
                }
              >
                <TableCell>
                  <Checkbox
                    checked={
                      selected
                    }
                    onCheckedChange={() =>
                      onToggleRow(
                        member.rowNumber,
                      )
                    }
                  />
                </TableCell>

                <TableCell className="font-medium">
                  {member.fullName}
                </TableCell>

                <TableCell>
                  {member.discordUsername}
                </TableCell>

                <TableCell className="font-mono text-xs">
                  {member.discordId}
                </TableCell>

                <TableCell>
                  {member.rank}
                </TableCell>

                <TableCell>
                  {member.joinDate ??
                    "-"}
                </TableCell>

                <TableCell>
                  {hasErrors ? (
                    <Badge
                      variant="destructive"
                      className="gap-1"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      Invalid
                    </Badge>
                  ) : (
                    <Badge
                      className="gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Ready
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
            {validationErrors.length > 0 && (
        <div className="border-t p-4">
          <h4 className="mb-3 text-sm font-semibold">
            Validation Errors
          </h4>

          <div className="space-y-2">
            {validationErrors.map(
              (
                error,
                index,
              ) => (
                <div
                  key={`${error.rowNumber}-${index}`}
                  className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Row{" "}
                      {error.rowNumber}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {error.message}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
            {members.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="text-lg font-semibold">
            No Members Loaded
          </h3>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Upload an Excel (.xlsx) file to preview
            existing XMD members before importing them
            into the Member Management System.
          </p>
        </div>
      )}

      {members.length > 0 && (
        <div className="border-t bg-muted/30 p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Total Members
              </p>

              <p className="mt-1 text-2xl font-bold">
                {members.length}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Selected
              </p>

              <p className="mt-1 text-2xl font-bold">
                {selectedRows.length}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Valid
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {members.length -
                  validationErrors.length}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Validation Errors
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {validationErrors.length}
              </p>
            </div>
          </div>
        </div>
      )}
          </div>
  );
}

export default ImportMembersTable;
