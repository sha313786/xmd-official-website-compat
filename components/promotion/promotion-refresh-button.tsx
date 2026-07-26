"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PromotionRefreshButton() {
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    try {
      setLoading(true);

      const response = await fetch("/api/promotion/refresh", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ?? "Failed to refresh promotion results."
        );
      }

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to refresh promotion results."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleRefresh}
      disabled={loading}
      className="gap-2"
    >
      <RefreshCw
        className={`h-4 w-4 ${
          loading ? "animate-spin" : ""
        }`}
      />

      {loading
        ? "Calculating..."
        : "Refresh Promotion Results"}
    </Button>
  );
}