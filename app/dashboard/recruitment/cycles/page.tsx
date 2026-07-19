"use client";

import { useState } from "react";


import { useRecruitmentCycles } from "@/hooks/use-recruitment-cycles";

export default function RecruitmentCyclesPage() {
  const {
    cycles,
    loading,
    createCycle,
    updateCycle,
    deleteCycle,
    activateCycle,
  } = useRecruitmentCycles();

  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Recruitment Cycles
          </h1>

          <p className="text-muted-foreground">
            Manage recruitment cycles and control which
            recruitment period is currently accepting
            applications.
          </p>
        </div>
      </div>
    </div>
  );
}