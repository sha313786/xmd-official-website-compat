"use client";

import { useCallback, useEffect, useState } from "react";

import { promotionService } from "@/services";
import {
  DutyLog,
  PromotionCycle,
  PromotionResult,
} from "@/types";

export function usePromotionCycles() {
  const [cycles, setCycles] = useState<PromotionCycle[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const data = await promotionService.getCycles();
      setCycles(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    cycles,
    loading,
    refresh,
  };
}

export function useActivePromotionCycle() {
  const [cycle, setCycle] = useState<PromotionCycle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCycle() {
      try {
        const data =
          await promotionService.getActiveCycle();

        setCycle(data);
      } finally {
        setLoading(false);
      }
    }

    loadCycle();
  }, []);

  return {
    cycle,
    loading,
  };
}

export function useDutyLogs(cycleId?: string) {
  const [logs, setLogs] = useState<DutyLog[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!cycleId) {
      setLogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data =
        await promotionService.getDutyLogs(cycleId);

      setLogs(data);
    } finally {
      setLoading(false);
    }
  }, [cycleId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    logs,
    loading,
    refresh,
  };
}

export function usePromotionResults(cycleId?: string) {
  const [results, setResults] = useState<
    PromotionResult[]
  >([]);

  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!cycleId) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data =
        await promotionService.getPromotionResults(
          cycleId
        );

      setResults(data);
    } finally {
      setLoading(false);
    }
  }, [cycleId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    results,
    loading,
    refresh,
  };
}