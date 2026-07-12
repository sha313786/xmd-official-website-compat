"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
  User,
  MessageSquare,
  Calendar,
  BadgeCheck,
} from "lucide-react";

import type { RecruitmentApplication } from "@/types/recruitment";

interface ApplicationDetailsDialogProps {
  application: RecruitmentApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDetailsDialog({
  application,
  open,
  onOpenChange,
}: ApplicationDetailsDialogProps) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Recruitment Application
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {application.full_name}
              </h2>

              <p className="text-muted-foreground">
                {application.discord_username}
              </p>
            </div>

            <Badge className="capitalize">
              {application.status}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Age
                  </p>

                  <p className="font-medium">
                    {application.age}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>

                  <p className="font-medium capitalize">
                    {application.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Discord
                  </p>

                  <p className="font-medium">
                    {application.discord_username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Submitted
                  </p>

                  <p className="font-medium">
                    {new Date(
                      application.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">
                Experience
              </h3>

              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {application.experience}
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">
                Reason for Joining
              </h3>

              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {application.reason}
              </p>
            </div>

            {application.review_notes && (
              <div>
                <h3 className="mb-2 font-semibold">
                  Review Notes
                </h3>

                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {application.review_notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}