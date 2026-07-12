"use client";

import { PromotionCycle } from "@/types";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PromotionCycleTableProps {
  cycles: PromotionCycle[];
  loading?: boolean;
  onView?: (cycle: PromotionCycle) => void;
  onEdit?: (cycle: PromotionCycle) => void;
  onActivate?: (cycle: PromotionCycle) => void;
  onDelete?: (cycle: PromotionCycle) => void;
}

export function PromotionCycleTable({
  cycles,
  loading,
  onView,
  onEdit,
  onActivate,
  onDelete,
}: PromotionCycleTableProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Loading promotion cycles...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cycles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No promotion cycles found.
                </TableCell>
              </TableRow>
            ) : (
              cycles.map((cycle) => (
                                <TableRow key={cycle.id}>
                  <TableCell className="font-medium">
                    {cycle.name}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      cycle.start_date
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      cycle.end_date
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        cycle.is_active
                          ? "default"
                          : "secondary"
                      }
                    >
                      {cycle.is_active
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
  <Button
    size="sm"
    variant="outline"
    onClick={() => onView?.(cycle)}
  >
    View
  </Button>

  <Button
    size="sm"
    onClick={() => onEdit?.(cycle)}
  >
    Edit
  </Button>

  {!cycle.is_active && (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => onActivate?.(cycle)}
    >
      Activate
    </Button>
  )}

  <Button
    size="sm"
    variant="destructive"
    onClick={() => onDelete?.(cycle)}
  >
    Delete
  </Button>
</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}