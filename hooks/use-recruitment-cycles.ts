"use client";

import { useCallback, useEffect, useState } from "react";

import {
  recruitmentCycleService,
  RecruitmentCycle,
} from "@/services/recruitment-cycle.service";

type CreateCycleData = Omit<
  RecruitmentCycle,
  | "id"
  | "created_at"
  | "updated_at"
  | "created_by"
  | "updated_by"
>;

export function useRecruitmentCycles() {
  const [cycles, setCycles] = useState<
    RecruitmentCycle[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadCycles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await recruitmentCycleService.getCycles();

      setCycles(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load recruitment cycles."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  const id = requestAnimationFrame(() => {
    void loadCycles();
  });

  return () => cancelAnimationFrame(id);
}, [loadCycles]);

  const createCycle = async (
    cycle: CreateCycleData
  ) => {
    try {
      const created =
        await recruitmentCycleService.createCycle(
          cycle
        );

      setCycles((prev) => [
        created,
        ...prev,
      ]);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateCycle = async (
    id: string,
    updates: Partial<RecruitmentCycle>
  ) => {
    try {
      const updated =
        await recruitmentCycleService.updateCycle(
          id,
          updates
        );

      setCycles((prev) =>
        prev.map((cycle) =>
          cycle.id === id
            ? updated
            : cycle
        )
      );

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteCycle = async (
    id: string
  ) => {
    try {
      await recruitmentCycleService.deleteCycle(
        id
      );

      setCycles((prev) =>
        prev.filter(
          (cycle) => cycle.id !== id
        )
      );

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const activateCycle = async (
    id: string
  ) => {
    try {
      await recruitmentCycleService.activateCycle(
        id
      );

      await loadCycles();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const activeCycle =
    cycles.find(
      (cycle) => cycle.is_active
    ) ?? null;

  return {
    cycles,
    activeCycle,
    loading,
    error,

    refresh: loadCycles,

    createCycle,
    updateCycle,
    deleteCycle,
    activateCycle,
  };
}