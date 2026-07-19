"use client";

import { useCallback, useEffect, useState } from "react";

import { applicationService } from "@/services/recruitment/application-service";

import {
  RecruitmentApplication,
  RecruitmentApplicationInsert,
  RecruitmentApplicationUpdate,
  RecruitmentStatus,
} from "@/types/recruitment";

export function useApplications() {
  const [applications, setApplications] = useState<
    RecruitmentApplication[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await applicationService.getAll();

      setApplications(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const createApplication = async (
    application: RecruitmentApplicationInsert
  ) => {
    const created = await applicationService.create(application);

    setApplications((prev) => [created, ...prev]);

    return created;
  };

  const updateApplication = async (
    id: string,
    updates: RecruitmentApplicationUpdate
  ) => {
    const updated = await applicationService.update(id, updates);

    setApplications((prev) =>
      prev.map((application) =>
        application.id === id ? updated : application
      )
    );

    return updated;
  };

  const deleteApplication = async (id: string) => {
    await applicationService.delete(id);

    setApplications((prev) =>
      prev.filter((application) => application.id !== id)
    );
  };

  const approveApplication = async (
    id: string,
    reviewerId?: string
  ) => {
    const updated = await applicationService.approve(
      id,
      reviewerId
    );

    setApplications((prev) =>
      prev.map((application) =>
        application.id === id ? updated : application
      )
    );

    return updated;
  };

  const rejectApplication = async (
    id: string,
    reviewerId?: string,
    reviewNotes?: string
  ) => {
    const updated = await applicationService.reject(
      id,
      reviewerId,
      reviewNotes
    );

    setApplications((prev) =>
      prev.map((application) =>
        application.id === id ? updated : application
      )
    );

    return updated;
  };

  const getApplication = async (id: string) => {
    return applicationService.getById(id);
  };

  const refresh = async () => {
    await loadApplications();
  };

  const getStatistics = async () => {
    return applicationService.getStatistics();
  };

  const getMonthlyApplications = async () => {
    return applicationService.getMonthlyApplications();
  };

  const getRecentApplications = async (limit = 5) => {
    return applicationService.getRecent(limit);
  };

  const getApplicationsByStatus = async (
    status: RecruitmentStatus
  ) => {
    return applicationService.getByStatus(status);
  };

  return {
    applications,
    loading,
    error,

    createApplication,
    updateApplication,
    deleteApplication,

    approveApplication,
    rejectApplication,

    getApplication,

    refresh,

    getStatistics,
    getMonthlyApplications,
    getRecentApplications,
    getApplicationsByStatus,
  };
}