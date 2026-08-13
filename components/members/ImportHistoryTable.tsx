"use client";

import {
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ImportHistoryItem {
  id: string;

  importedAt: string;

  importedBy: string;

  processed: number;

  imported: number;

  skipped: number;

  status:
    | "SUCCESS"
    | "PARTIAL"
    | "FAILED";
}

interface ImportHistoryTableProps {
  history: ImportHistoryItem[];

  loading?: boolean;
}

export function ImportHistoryTable({
  history,
  loading = false,
}: ImportHistoryTableProps) {
  const getStatusBadge = (
    status: ImportHistoryItem["status"],
  ) => {
    switch (status) {
      case "SUCCESS":
        return (
          <Badge className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Success
          </Badge>
        );

      case "PARTIAL":
        return (
          <Badge
            variant="secondary"
            className="gap-1"
          >
            <Users className="h-3 w-3" />
            Partial
          </Badge>
        );

      case "FAILED":
        return (
          <Badge
            variant="destructive"
            className="gap-1"
          >
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Import History
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Date
              </TableHead>

              <TableHead>
                Imported By
              </TableHead>

              <TableHead>
                Processed
              </TableHead>

              <TableHead>
                Imported
              </TableHead>

              <TableHead>
                Skipped
              </TableHead>

              <TableHead>
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
                      {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  Loading import history...
                </TableCell>
              </TableRow>
            ) : history.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No import history available.
                </TableCell>
              </TableRow>
            ) : (
              history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />

                      <span>
                        {item.importedAt}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    {item.importedBy}
                  </TableCell>

                  <TableCell>
                    {item.processed}
                  </TableCell>

                  <TableCell>
                    <span className="font-medium text-green-600">
                      {item.imported}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium text-red-600">
                      {item.skipped}
                    </span>
                  </TableCell>

                  <TableCell>
                    {getStatusBadge(
                      item.status,
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
                <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Total Imports
            </p>

            <p className="mt-2 text-2xl font-bold">
              {history.length}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Members Processed
            </p>

            <p className="mt-2 text-2xl font-bold">
              {history.reduce(
                (
                  total,
                  item,
                ) =>
                  total +
                  item.processed,
                0,
              )}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Members Imported
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {history.reduce(
                (
                  total,
                  item,
                ) =>
                  total +
                  item.imported,
                0,
              )}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Members Skipped
            </p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {history.reduce(
                (
                  total,
                  item,
                ) =>
                  total +
                  item.skipped,
                0,
              )}
            </p>
          </div>
        </div>
              </CardContent>
    </Card>
  );
}

export default ImportHistoryTable;