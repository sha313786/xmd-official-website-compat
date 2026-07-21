"use client";

import { useCallback, useEffect, useState } from "react";

import { applicationService } from "@/services/application-service";

import type {
  RecruitmentApplication,
} from "@/types/recruitment";

export function useApplication(id: string) {
  const [application, setApplication] =
    useState<RecruitmentApplication | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadApplication = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);

      const result =
        await applicationService.getApplication(id);

      setApplication(result);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const approve = async (
  reviewedBy: string
) => {
  if (!application) return;

  const updated =
    await applicationService.reviewApplication(
      application.id,
      {
        status: "approved",
        reviewed_by: reviewedBy, // Replace later with logged-in user
        review_notes: null,
      }
    );

  setApplication(updated);
};

const reject = async (
  reviewedBy: string
) => {
  if (!application) return;

  const updated =
    await applicationService.reviewApplication(
      application.id,
      {
        status: "rejected",
        reviewed_by: reviewedBy, // Replace later with logged-in user
        review_notes: null,
      }
    );

  setApplication(updated);
};
  return {
    application,
    loading,
    refresh: loadApplication,
    approve,
    reject,
  
  };
}