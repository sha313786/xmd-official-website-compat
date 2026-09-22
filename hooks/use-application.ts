import { useCallback, useEffect, useState } from "react";
import { applicationService } from "@/services/recruitment/application-service";
import type {
  InterviewStatus,
  RecruitmentApplication,
} from "@/types/recruitment";

export function useApplication(id: string) {
  const [application, setApplication] =
    useState<RecruitmentApplication | null>(null);
  const [loading, setLoading] = useState(true);

  const loadApplication = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await applicationService.getById(id);
      setApplication(data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadApplication();
  }, [loadApplication]);

  const approve = async (
    reviewedBy: string | null,
    reviewNotes: string | null = null
  ) => {
    if (!application) return;

    const updated = await applicationService.reviewApplication(
      application.id,
      {
        status: "approved",
        reviewed_by: reviewedBy,
        review_notes: reviewNotes,
      }
    );

    setApplication(updated);
    return updated;
  };

  const reject = async (
    reviewedBy: string | null,
    reviewNotes: string | null = null
  ) => {
    if (!application) return;

    const updated = await applicationService.reviewApplication(
      application.id,
      {
        status: "rejected",
        reviewed_by: reviewedBy,
        review_notes: reviewNotes,
      }
    );

    setApplication(updated);
    return updated;
  };

  const updateInterviewStatus = async (
    interviewStatus: InterviewStatus
  ) => {
    if (!application) return;

    const updated = await applicationService.updateInterviewStatus(
      application.id,
      interviewStatus
    );

    setApplication(updated);
    return updated;
  };

  return {
    application,
    loading,
    refresh: loadApplication,
    approve,
    reject,
    updateInterviewStatus,
  };
}
