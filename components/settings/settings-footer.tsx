"use client";

import { Button } from "@/components/ui/button";

import SaveButton from "./save-button";

interface SettingsFooterProps {
  loading: boolean;
  isDirty: boolean;
  onReset: () => void;

  metadata?: {
    updatedAt: string | null;
    updatedBy: string | null;
  } | null;
}

export default function SettingsFooter({
  loading,
  isDirty,
  onReset,
  metadata,
}: SettingsFooterProps) {

  return (
  <div className="flex items-center justify-between border-t pt-6">
    <div className="text-sm text-muted-foreground">
      {metadata?.updatedAt ? (
        <>
          <div>
            Last Updated:{" "}
            {new Date(
              metadata.updatedAt
            ).toLocaleString()}
          </div>

          <div>
            Updated By:{" "}
            {metadata.updatedBy ?? "System"}
          </div>
        </>
      ) : (
        <div>No update history available.</div>
      )}
    </div>

    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={!isDirty || loading}
      >
        Reset
      </Button>

      <SaveButton
        loading={loading}
        disabled={!isDirty}
      />
    </div>
  </div>
);
}
