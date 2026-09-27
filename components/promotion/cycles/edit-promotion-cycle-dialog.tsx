"use client";

import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditPromotionCycleDialogProps {
  cycle: PromotionCycle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    id: string,
    data: {
      name: string;
      start_date: string;
      end_date: string;
      required_hours: number;
      required_days: number;
    }
  ) => Promise<void> | void;
}

export function EditPromotionCycleDialog({
  cycle,
  open,
  onOpenChange,
  onSave,
}: EditPromotionCycleDialogProps) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [requiredHours, setRequiredHours] = useState(25);
  const [requiredDays, setRequiredDays] = useState(0);

  useEffect(() => {
    if (!cycle) return;

    const id = requestAnimationFrame(() => {
      setName(cycle.name);
      setStartDate(cycle.start_date.slice(0, 10));
      setEndDate(cycle.end_date.slice(0, 10));
      setRequiredHours(cycle.required_hours ?? 25);
      setRequiredDays(cycle.required_days ?? 0);
    });

    return () => cancelAnimationFrame(id);
  }, [cycle]);

  async function handleSave() {
    if (!cycle) return;

    try {
      setLoading(true);

      await onSave(cycle.id, {
        name,
        start_date: startDate,
        end_date: endDate,
        required_hours: Number(requiredHours) || 0,
        required_days: Number(requiredDays) || 0,
      });

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  if (!cycle) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Edit Promotion Cycle
          </DialogTitle>

          <DialogDescription>
            Update the promotion cycle details and minimum duty requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cycle-name">
              Cycle Name
            </Label>

            <Input
              id="cycle-name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">
                Start Date
              </Label>

              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="end-date">
                End Date
              </Label>

              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="req-hours">
                Minimum Duty Hours <span className="text-red-400">*</span>
              </Label>

              <Input
                id="req-hours"
                type="number"
                min="0"
                step="1"
                value={requiredHours}
                onChange={(e) =>
                  setRequiredHours(Number(e.target.value))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="req-days">
                Minimum Duty Days
              </Label>

              <Input
                id="req-days"
                type="number"
                min="0"
                step="1"
                value={requiredDays}
                onChange={(e) =>
                  setRequiredDays(Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}