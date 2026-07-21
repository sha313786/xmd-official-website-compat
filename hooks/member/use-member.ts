"use client";

import { useEffect, useState } from "react";

import { memberService } from "@/services/members/member.service";

import type { Member } from "@/types/member";

export function useMember(
  id?: string | null
) {
  const [member, setMember] =
    useState<Member | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!id) {
      setMember(null);
      return;
    }

    async function load() {
      try {
        setLoading(true);

        const result =
          await memberService.getById(id);

        setMember(result ?? null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return {
    member,
    loading,
  };
}