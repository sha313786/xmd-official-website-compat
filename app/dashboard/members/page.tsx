"use client";

import { useMemo, useState } from "react";

import { AddMemberDialog } from "@/components/members/add-member-dialog";
import { MemberCard } from "@/components/members/member-card";
import { MemberDepartmentFilter } from "@/components/members/member-department-filter";
import { MemberRankFilter } from "@/components/members/member-rank-filter";
import { MemberSearch } from "@/components/members/member-search";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { PageHeader } from "@/components/shared/page-header";
import { PermissionGuard } from "@/components/shared/permission-guard";
import { useMembers } from "@/hooks/use-members";

export default function MembersPage() {
  const {
  members,
  loading,
  refresh,
} = useMembers();
  const [search, setSearch] = useState("");
  const [rank, setRank] = useState("All");
  const [department, setDepartment] = useState("All");

  // Temporary until Authentication & RBAC are implemented
  const canManageMembers = true;

  const filteredMembers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return members.filter((member) => {
      const matchesSearch =
  !query ||
  (member.full_name ?? "")
    .toLowerCase()
    .includes(query) ||
  member.rank.toLowerCase().includes(query) ||
  member.department.toLowerCase().includes(query) ||
  (member.badge_number ?? "")
    .toLowerCase()
    .includes(query);

      const matchesRank =
        rank === "All" || member.rank === rank;

      const matchesDepartment =
        department === "All" ||
        member.department === department;

      return (
        matchesSearch &&
        matchesRank &&
        matchesDepartment
      );
    });
  }, [members, search, rank, department]);

  if (loading) {
    return (
      <LoadingSpinner text="Loading members..." />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Member Directory"
        description="Browse all registered XMD members."
        action={
          <PermissionGuard allowed={canManageMembers}>
            <AddMemberDialog
              onSuccess={refresh}
            />
          </PermissionGuard>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <MemberSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        <MemberRankFilter
          value={rank}
          onChange={setRank}
        />

        <MemberDepartmentFilter
          value={department}
          onChange={setDepartment}
        />
      </div>

      {filteredMembers.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Try changing your search or filter options."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onRefresh={refresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}