"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

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

import { Member } from "@/types/member";

interface EditMemberDialogProps {
  member: Member;
  onSuccess: () => Promise<void>;
}

export function EditMemberDialog({
  member,
  onSuccess,
}: EditMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: MemberFormValues
  ) {
    try {
      setLoading(true);

      await memberService.update(member.id, {
        fullName: values.full_name,
        badgeNumber: values.badge_number,
        discordId: values.discord_Id,
        rank: values.rank,
        department: values.department,
        status: values.status,
      });

      await onSuccess();

      setOpen(false);

      alert("Member updated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to update member.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Edit Member
            </DialogTitle>

            <DialogDescription>
              Update member information.
            </DialogDescription>
          </DialogHeader>

          <MemberForm
            loading={loading}
            defaultValues={{
              fullName: member.full_name,
              badgeNumber: member.badge_number,
              discordId: member.discord_Id,
              rank: member.rank,
              department: member.department,
              status: member.status,
            }}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}