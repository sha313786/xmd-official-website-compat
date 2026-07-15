"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { memberService } from "@/services";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteMemberDialogProps {
  memberId: string;
  memberName: string;
  onSuccess: () => Promise<void>;
}

export function DeleteMemberDialog({
  memberId,
  memberName,
  onSuccess,
}: DeleteMemberDialogProps) {
  async function handleDelete() {
    try {
      await memberService.delete(memberId);

      await onSuccess();

      alert("Member deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete member.");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Member?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{memberName}</strong>?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}