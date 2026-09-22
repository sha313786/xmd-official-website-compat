import { useCallback, useEffect, useState } from "react";
import { applicationService } from "@/services/recruitment/application-service";
import type {
  InterviewStatus,
  RecruitmentApplication,
  RecruitmentApplicationInsert,
  RecruitmentApplicationUpdate,
  RecruitmentStatus,
} from "@/types/recruitment";

export function useApplications() {
  const [applications, setApplications] = useState<RecruitmentApplication[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createApplication = async (
    application: RecruitmentApplicationInsert
  ) => {
    const created = await applicationService.create(application);
    await refresh();
    return created;
  };

  const updateApplication = async (
    id: string,
    updates: RecruitmentApplicationUpdate
  ) => {
    const updated = await applicationService.update(id, updates);
    await refresh();
    return updated;
  };

  const deleteApplication = async (id: string) => {
    await applicationService.delete(id);
    await refresh();
  };

  const approveApplication = async (
    id: string,
    reviewedBy: string | null = null,
    reviewNotes: string | null = null
  ) => {
    const updated = await applicationService.approve(
      id,
      reviewedBy,
      reviewNotes
    );
    await refresh();
    return updated;
  };

  const rejectApplication = async (
    id: string,
    reviewedBy: string | null = null,
    reviewNotes: string | null = null
  ) => {
    const updated = await applicationService.reject(
      id,
      reviewedBy,
      reviewNotes
    );
    await refresh();
    return updated;
  };

  const updateInterviewStatus = async (
    id: string,
    interviewStatus: InterviewStatus
  ) => {
    const updated = await applicationService.updateInterviewStatus(
      id,
      interviewStatus
    );
    await refresh();
    return updated;
  };

  const createMemberFromApplication = async (id: string) => {
    const memberId = await applicationService.createMemberFromApplication(id);
    await refresh();
    return memberId;
  };

  const getApplication = async (id: string) => {
    return applicationService.getById(id);
  };

  const getStatistics = async () => {
    return applicationService.getStatistics();
  };

  const getMonthlyApplications = async () => {
    return applicationService.getMonthlyApplications();
  };

  const getRecentApplications = async (limit = 5) => {
    return applicationService.getRecentApplications(limit);
  };

  const getApplicationsByStatus = async (status: RecruitmentStatus) => {
    return applicationService.getByStatus(status);
  };

  return {
    applications,
    loading,
    refresh,
    createApplication,
    updateApplication,
    deleteApplication,
    approveApplication,
    rejectApplication,
    updateInterviewStatus,
    createMemberFromApplication,
    getApplication,
    getStatistics,
    getMonthlyApplications,
    getRecentApplications,
    getApplicationsByStatus,
  };
}
