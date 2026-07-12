"use client";

import { useState } from "react";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { promotionService } from "@/services";

export function PromotionRefreshButton() {
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    try {
      setLoading(true);

      await promotionService.refreshActiveCycle();

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to refresh promotion results.");
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