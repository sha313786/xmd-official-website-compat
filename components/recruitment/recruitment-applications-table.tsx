"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Filter,
  Eye,
  Check,
  X,
} from "lucide-react";

import { useApplications } from "@/hooks/use-applications";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  ApplicationDetailsDialog,
} from "@/components/recruitment/application-details-dialog";

import { RecruitmentApplication } from "@/types/recruitment";

type StatusFilter =
  | "all"
  | "pending"
  | "approved"
  | "rejected";

type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc";

export function RecruitmentApplicationsTable() {
  const {
    applications,
    loading,
    approveApplication,
    rejectApplication,
  } = useApplications();

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("newest");

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [
    selectedApplication,
    setSelectedApplication,
  ] =
    useState<RecruitmentApplication | null>(
      null
    );

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const filteredApplications =
    useMemo(() => {
      const filtered = applications.filter(
        (application) => {
          const matchesSearch =
            application.full_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            application.discord_username
              .toLowerCase()
              .includes(search.toLowerCase());

          const matchesStatus =
            statusFilter === "all"
              ? true
              : application.status ===
                statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

      switch (sortBy) {
        case "oldest":
          filtered.sort(
            (a, b) =>
              new Date(
                a.created_at
              ).getTime() -
              new Date(
                b.created_at
              ).getTime()
          );
          break;

        case "name-asc":
          filtered.sort((a, b) =>
            a.full_name.localeCompare(
              b.full_name
            )
          );
          break;

        case "name-desc":
          filtered.sort((a, b) =>
            b.full_name.localeCompare(
              a.full_name
            )
          );
          break;

        default:
          filtered.sort(
            (a, b) =>
              new Date(
                b.created_at
              ).getTime() -
              new Date(
                a.created_at
              ).getTime()
          );
      }

      return filtered;
    }, [
      applications,
      search,
      statusFilter,
      sortBy,
    ]);

  const toggleSelection = (
    id: string
  ) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    if (
      selectedIds.length ===
      filteredApplications.length
    ) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(
      filteredApplications.map(
        (application) =>
          application.id
      )
    );
  };
  const handleBulkApprove = async () => {
  for (const id of selectedIds) {
    await approveApplication(id);
  }

  setSelectedIds([]);
};

const handleBulkReject = async () => {
  for (const id of selectedIds) {
    await rejectApplication(id);
  }

  setSelectedIds([]);
};
    if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading applications...
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>

        <CardHeader>
          <CardTitle>
            Recruitment Applications
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">

            <div className="relative w-full md:max-w-md">

              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search applicants..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="pl-10"
              />

            </div>

            <div className="flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-2">

                <Filter className="h-4 w-4 text-muted-foreground" />

                <select
                  className="h-10 rounded-lg border bg-background px-4 text-sm shadow-sm"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as StatusFilter
                    )
                  }
                >
                  <option value="all">
                    All Status
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="approved">
                    Approved
                  </option>

                  <option value="rejected">
                    Rejected
                  </option>

                </select>

              </div>

              <select
                className="h-10 rounded-lg border bg-background px-4 text-sm shadow-sm"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as SortOption
                  )
                }
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="name-asc">
                  Name (A–Z)
                </option>

                <option value="name-desc">
                  Name (Z–A)
                </option>

              </select>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full border-separate border-spacing-0 text-sm">

              <thead>

                <tr className="bg-muted/50">

                  <th className="w-12 rounded-l-lg px-4 py-3">

                    <input
                      type="checkbox"
                      checked={
                        filteredApplications.length > 0 &&
                        selectedIds.length ===
                          filteredApplications.length
                      }
                      onChange={toggleSelectAll}
                    />

                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Discord
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Age
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Status
                  </th>

                  <th className="rounded-r-lg px-4 py-3 text-right font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                             {filteredApplications.map((application) => (

                <tr
                  key={application.id}
                  className="transition-colors hover:bg-muted/40"
                >

                  <td className="border-b px-4 py-4">

                    <input
                      type="checkbox"
                      checked={selectedIds.includes(application.id)}
                      onChange={() =>
                        toggleSelection(application.id)
                      }
                    />

                  </td>

                  <td className="border-b px-4 py-4 font-medium">
                    {application.full_name}
                  </td>

                  <td className="border-b px-4 py-4">
                    {application.discord_username}
                  </td>

                  <td className="border-b px-4 py-4">
                    {application.age}
                  </td>

                  <td className="border-b px-4 py-4">

                    <Badge
                      variant={
                        application.status === "approved"
                          ? "default"
                          : application.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {application.status}
                    </Badge>

                  </td>

                  <td className="border-b px-4 py-4">

                    <div className="flex justify-end gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                          setSelectedApplication(application);
                          setDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>

                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() =>
                          approveApplication(application.id)
                        }
                        disabled={
                          application.status === "approved"
                        }
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() =>
                          rejectApplication(application.id)
                        }
                        disabled={
                          application.status === "rejected"
                        }
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>

                    </div>

                  </td>

                </tr>

              ))}

              {filteredApplications.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No recruitment applications found.
                  </td>

                </tr>

              )}

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>

      <ApplicationDetailsDialog
        application={selectedApplication}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

    </>
  );
} 