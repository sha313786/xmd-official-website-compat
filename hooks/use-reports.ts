"use client";

import { useCallback, useEffect, useState } from "react";

import { reportService } from "@/services";
import { Report } from "@/types";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);

      const data = await reportService.getAll();

      setReports(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const createReport = async (
    report: Omit<Report, "id" | "createdAt" | "updatedAt">
  ) => {
    const created = await reportService.create(report);

    setReports((prev) => [created, ...prev]);

    return created;
  };

  const updateReport = async (
    id: string,
    updates: Partial<Report>
  ) => {
    const updated = await reportService.update(id, updates);

    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? updated : report
      )
    );

    return updated;
  };

  const deleteReport = async (id: string) => {
    await reportService.delete(id);

    setReports((prev) =>
      prev.filter((report) => report.id !== id)
    );
  };

  return {
    reports,
    loading,
    refresh: fetchReports,
    createReport,
    updateReport,
    deleteReport,
  };
}