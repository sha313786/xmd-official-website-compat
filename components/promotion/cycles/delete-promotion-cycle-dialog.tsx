"use client";

import { PromotionCycle } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DeletePromotionCycleDialogProps {
  cycle: PromotionCycle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => Promise<void> | void;
}

export function DeletePromotionCycleDialog({
  cycle,
  open,
  onOpenChange,
  onDelete,
}: DeletePromotionCycleDialogProps) {
  if (!cycle) return null;

  async function handleDelete() {
    await onDelete(cycle.id);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Delete Promotion Cycle
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
                <div className="rounded-lg border p-4">
          <p className="font-medium">
            {cycle.name}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(
              cycle.start_date
            ).toLocaleDateString()}
            {" - "}
            {new Date(
              cycle.end_date
            ).toLocaleDateString()}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}