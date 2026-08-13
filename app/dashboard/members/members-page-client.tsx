"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    const query = search
      .toLowerCase()
      .trim();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        (member.fullName ?? "")
          .toLowerCase()
          .includes(query) ||
        member.rank
          .toLowerCase()
          .includes(query) ||
        member.department
          .toLowerCase()
          .includes(query) ||
        (member.badgeNumber ?? "")
          .toLowerCase()
          .includes(query);

      const matchesRank =
        rank === "All" ||
        member.rank === rank;

      const matchesDepartment =
        department === "All" ||
        member.department === department;

      return (
        matchesSearch &&
        matchesRank &&
        matchesDepartment
      );
    });
  }, [
    members,
    search,
    rank,
    department,
  ]);

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
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
              >
                <Link href="/dashboard/members/import">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Import Existing Members
                </Link>
              </Button>

              <AddMemberDialog
                onSuccess={refresh}
              />
            </div>
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