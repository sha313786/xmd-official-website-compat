"use client";

import { useCallback, useEffect, useState } from "react";

import { PromotionCycle } from "@/types";

import { promotionCycleService } from "@/services/promotion-cycle.service";

export function usePromotionCycles() {
  const [cycles, setCycles] = useState<PromotionCycle[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadCycles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await promotionCycleService.getCycles();

      setCycles(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load promotion cycles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCycles();
  }, [loadCycles]);
    async function createCycle(data: {
    name: string;
    start_date: string;
    end_date: string;
  }) {
    await promotionCycleService.createCycle(data);

    await loadCycles();
  }
  async function updateCycle(
  id: string,
  data: {
    name: string;
    start_date: string;
    end_date: string;
  }
) {
  await promotionCycleService.updateCycle(id, data);

  await loadCycles();
}

async function deleteCycle(id: string) {
  await promotionCycleService.deleteCycle(id);

  await loadCycles();
}

async function activateCycle(id: string) {
  await promotionCycleService.setActiveCycle(id);

  await loadCycles();
}

  async function refresh() {
    await loadCycles();
  }

  return {
    cycles,
    loading,
    error,

    refresh,

     createCycle,
     updateCycle,
    deleteCycle,
    activateCycle,
 };
}