"use client";

import { CalendarClock, User } from "lucide-react";

interface SettingsMetadataProps {
  updatedAt?: string | null;
  updatedBy?: string | null;
}

export default function SettingsMetadata({
  updatedAt,
  updatedBy,
}: SettingsMetadataProps) {
  if (!updatedAt && !updatedBy) {
    return null;
  }

  const formattedDate = updatedAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(updatedAt))
    : "Unknown";

  return (
    <div className="mt-6 rounded-lg border bg-muted/30 p-4">
      <h4 className="mb-3 text-sm font-semibold">
        Last Update
      </h4>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{updatedBy ?? "Unknown User"}</span>
        </div>
      </div>
    </div>
  );
}