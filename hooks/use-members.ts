"use client";

import { useCallback, useEffect, useState } from "react";

import { memberService } from "@/services";
import { Member } from "@/types/member";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const data = await memberService.getAll();
      setMembers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    members,
    loading,
    refresh,
  };
}

export function useMember(id: string) {
  const [member, setMember] = useState<Member>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMember() {
      try {
        const data = await memberService.getById(id);
        setMember(data);
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, [id]);

  return {
    member,
    loading,
  };
}