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

interface ActivateCycleDialogProps {
  cycle: PromotionCycle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: (id: string) => Promise<void> | void;
}

export function ActivateCycleDialog({
  cycle,
  open,
  onOpenChange,
  onActivate,
}: ActivateCycleDialogProps) {
  if (!cycle) return null;

  async function handleActivate() {
    await onActivate(cycle.id);
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
            Activate Promotion Cycle
          </DialogTitle>

          <DialogDescription>
            This will make the selected promotion cycle the
            active cycle. Any currently active cycle will be
            automatically deactivated.
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
            onClick={handleActivate}
          >
            Activate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
