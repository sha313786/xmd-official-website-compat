"use client";

import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
};

export default function SaveButton({
  loading,
}: Props) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full"
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