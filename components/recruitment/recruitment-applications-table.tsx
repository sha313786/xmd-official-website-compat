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

import {
  RecruitmentApplication,
} from "@/types/recruitment";

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
          const keyword =
            search.toLowerCase();

          const matchesSearch =
            application.full_name
              .toLowerCase()
              .includes(keyword) ||
            application.character_name
              .toLowerCase()
              .includes(keyword);

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

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading recruitment applications...
        </CardContent>
      </Card>
    );
  }
    return (
    <>
      <Card>

        <CardHeader className="space-y-4">

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

            <div>

              <CardTitle>
                Recruitment Applications
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredApplications.length} application
                {filteredApplications.length !== 1 && "s"} found
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-md">

              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by name or Discord username..."
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
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as StatusFilter
                    )
                  }
                  className="h-10 rounded-lg border bg-background px-4 text-sm"
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
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as SortOption
                  )
                }
                className="h-10 rounded-lg border bg-background px-4 text-sm"
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

        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full border-collapse text-sm">

              <thead>

                <tr className="border-b bg-muted/40">

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
                    Country
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Applied
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>
                              {filteredApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-4 font-medium">
                    {application.full_name}
                  </td>

                  <td className="px-4 py-4">
                    {application.character_name}
                  </td>

                  <td className="px-4 py-4">
                    {application.real_age}
                  </td>

                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        application.status === "approved"
                          ? "default"
                          : application.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </Badge>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {new Date(
                      application.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                          setSelectedApplication(
                            application
                          );
                          setDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>

                      <Button
                        size="sm"
                        className="gap-2"
                        disabled={
                          application.status ===
                          "approved"
                        }
                        onClick={() =>
                          approveApplication(
                            application.id
                          )
                        }
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        disabled={
                          application.status ===
                          "rejected"
                        }
                        onClick={() =>
                          rejectApplication(
                            application.id
                          )
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
                    colSpan={7}
                    className="px-4 py-12 text-center"
                  >
                    <div className="space-y-2">

                      <p className="text-lg font-medium">
                        No recruitment applications found
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Try changing the search or filter,
                        or wait for new applications to
                        arrive.
                      </p>

                    </div>
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