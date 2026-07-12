"use client";

import { useCallback, useEffect, useState } from "react";

import { applicationService } from "@/services";
import {
  RecruitmentApplication,
  RecruitmentApplicationInsert,
  RecruitmentApplicationUpdate,
} from "@/types/recruitment";

export function useApplications() {
  const [applications, setApplications] = useState<
    RecruitmentApplication[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const createApplication = async (
    application: RecruitmentApplicationInsert
  ) => {
    const newApplication =
      await applicationService.create(application);

    setApplications((prev) => [newApplication, ...prev]);

    return newApplication;
  };

  const updateApplication = async (
    id: string,
    updates: RecruitmentApplicationUpdate
  ) => {
    const updated =
      await applicationService.update(id, updates);

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

  const approveApplication = async (id: string) => {
  const updated = await applicationService.approve(id);

  setApplications((prev) =>
    prev.map((application) =>
      application.id === id ? updated : application
    )
  );
};

const rejectApplication = async (id: string) => {
  const updated = await applicationService.reject(id);

  setApplications((prev) =>
    prev.map((application) =>
      application.id === id ? updated : application
    )
  );
};
  return {
  applications,
  loading,
  refresh: fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  approveApplication,
  rejectApplication,
};
}