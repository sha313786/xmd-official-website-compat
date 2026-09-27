"use client";

import { useState } from "react";
import { AlertCircle, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface RejectApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantName?: string;
  characterName?: string;
  discordId?: string;
  onConfirm: (reason: string) => Promise<void> | void;
}

const QUICK_PRESETS = [
  "Incomplete or low-effort application answers",
  "Age requirement (18+) not met",
  "Active gang or criminal record conflict",
  "Insufficient medical roleplay experience / scenario responses",
  "Failed background or conduct verification",
  "Department recruitment quota reached for this cycle",
];

export function RejectApplicationDialog({
  open,
  onOpenChange,
  applicantName,
  characterName,
  discordId,
  onConfirm,
}: RejectApplicationDialogProps) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSelectPreset = (preset: string) => {
    setReason((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return preset;
      if (trimmed.includes(preset)) return trimmed;
      return `${trimmed}\n• ${preset}`;
    });
  };

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      await onConfirm(reason.trim());
      setReason("");
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!submitting) {
      setReason("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-lg border-red-500/20 bg-[#0a0c10] p-6 text-foreground shadow-2xl backdrop-blur-xl">
        <DialogHeader className="gap-2">
          <div className="flex items-center gap-2.5 text-red-500">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
                Reject Recruitment Application
              </DialogTitle>
              {applicantName && (
                <p className="text-xs text-muted-foreground">
                  Applicant: <span className="font-medium text-foreground">{applicantName}</span>
                  {characterName ? ` (${characterName})` : ""}
                </p>
              )}
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
            Specify the reason for rejecting this application. This reason will be recorded in the dossier and sent directly to the applicant via Discord DM.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Quick preset tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
              Quick Preset Reasons
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Reason Textarea */}
          <div className="space-y-1.5">
            <label
              htmlFor="reject-reason"
              className="text-xs font-medium text-foreground"
            >
              Rejection Reason & Feedback <span className="text-red-400">*</span>
            </label>
            <Textarea
              id="reject-reason"
              rows={4}
              placeholder="e.g. Thank you for your interest. Unfortunately, your scenario responses lacked necessary medical roleplay protocol detail..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-white/10 bg-black/40 text-sm focus-visible:border-red-500/50 focus-visible:ring-red-500/20 placeholder:text-muted-foreground/50"
            />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Markdown formatting supported in Discord DM</span>
              {discordId && (
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  Target Discord: {discordId}
                </span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={submitting}
            className="border-white/10 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting || !reason.trim()}
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950/40 gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? "Rejecting..." : "Confirm & Send DM"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
