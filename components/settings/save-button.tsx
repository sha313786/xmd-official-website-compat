"use client";

import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SaveButton({
  loading = false,
  disabled = false,
  className,
}: SaveButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading || disabled}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </>
      )}
    </Button>
  );
}