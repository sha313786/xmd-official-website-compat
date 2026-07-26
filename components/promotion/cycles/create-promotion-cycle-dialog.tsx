"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreatePromotionCycleDialogProps {
  onCreate: (data: {
    name: string;
    start_date: string;
    end_date: string;
  }) => Promise<void> | void;
}

export function CreatePromotionCycleDialog({
  onCreate,
}: CreatePromotionCycleDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function handleSubmit() {
    if (!name || !startDate || !endDate) return;

    try {
      setLoading(true);

      await onCreate({
        name,
        start_date: startDate,
        end_date: endDate,
      });

      setName("");
      setStartDate("");
      setEndDate("");

      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Promotion Cycle
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Promotion Cycle
          </DialogTitle>

          <DialogDescription>
            Create a new promotion cycle for duty tracking and
            promotion calculation.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Cycle Name
            </Label>

            <Input
              id="name"
              placeholder="July 2026 Promotion Cycle"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="start">
              Start Date
            </Label>

            <Input
              id="start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="end">
              End Date
            </Label>

            <Input
              id="end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}