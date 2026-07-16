"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { MemberStatCard } from "@/components/members/member-stat-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { useMembers } from "@/hooks/use-members";

export default function MemberProfilePage() {
  const params = useParams<{ id: string }>();

  const { members, loading } = useMembers();

  const member = useMemo(
    () => members.find((m) => m.id === params.id),
    [members, params.id]
  );

  if (loading) {
    return <LoadingSpinner text="Loading member..." />;
  }

  if (!member) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Member not found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-600 text-3xl font-bold text-white">
            {(member.fullname ?? "")
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {member.fullname}
            </h1>

            <p className="mt-1 text-muted-foreground">
              {member.rank}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm text-white">
                {member.department}
              </span>

              <span className="rounded-full border px-3 py-1 text-sm">
                {member.badgenumber}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MemberStatCard
          label="Badge Number"
          value={member.badgenumber}
        />

        <MemberStatCard
          label="Department"
          value={member.department}
        />

        <MemberStatCard
          label="Duty Hours"
          value={member.dutyhours}
        />

        <MemberStatCard
          label="Duty Days"
          value={member.dutydays}
        />

        <MemberStatCard
          label="Joined Date"
          value={member.joinedat}
        />

        <MemberStatCard
          label="Promotion Progress"
          value="Coming Soon"
          valueClassName="text-red-600"
        />
      </div>
    </div>
  );
}