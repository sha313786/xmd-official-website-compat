"use client";

import { PromotionCycle } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface ViewPromotionCycleDialogProps {
  cycle: PromotionCycle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewPromotionCycleDialog({
  cycle,
  open,
  onOpenChange,
}: ViewPromotionCycleDialogProps) {
  if (!cycle) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Promotion Cycle Details
          </DialogTitle>

          <DialogDescription>
            View information about the selected
            promotion cycle.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
                      <div>
            <p className="text-sm text-muted-foreground">
              Cycle Name
            </p>

            <p className="font-medium">
              {cycle.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Start Date
              </p>

              <p>
                {new Date(
                  cycle.start_date
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                End Date
              </p>

              <p>
                {new Date(
                  cycle.end_date
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Status
            </p>

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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}