"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { memberService } from "@/services";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  MemberForm,
  MemberFormValues,
} from "@/components/members/member-form";

interface AddMemberDialogProps {
  onSuccess: () => Promise<void>;
}

export function AddMemberDialog({
  onSuccess,
}: AddMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: MemberFormValues
  ) {
    try {
      setLoading(true);

      await memberService.create({
        fullName: values.fullName,
        badgeNumber: values.badgeNumber,
        discordId: values.discordId,
        rank: values.rank,
        department: values.department,
        status: values.status,
      });

      await onSuccess();

      setOpen(false);

      alert("Member created successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to create member.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New Member
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Add New Member
            </DialogTitle>

            <DialogDescription>
              Create a new XMD member profile.
            </DialogDescription>
          </DialogHeader>

          <MemberForm
            loading={loading}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}