"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AddPatientDialog } from "@/components/patients/add-patient-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { PageHeader } from "@/components/shared/page-header";
import { PermissionGuard } from "@/components/shared/permission-guard";
import { usePatients } from "@/hooks/use-patients";

export default function PatientsPageClient() {
  const router = useRouter();

  const {
    patients,
    loading,
    refresh,
  } = usePatients();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const canManagePatients = true;

  const filteredPatients = useMemo(() => {
    const query = search.toLowerCase().trim();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        (patient.fullName ?? "")
          .toLowerCase()
          .includes(query) ||
        (patient.patientId ?? "")
          .toLowerCase()
          .includes(query) ||
        (patient.email ?? "")
          .toLowerCase()
          .includes(query) ||
        (patient.phone ?? "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "All" ||
        patient.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, status]);

  if (loading) {
    return (
      <LoadingSpinner text="Loading patients..." />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Directory"
        description="Browse all registered XMD patients."
        action={
          <PermissionGuard
            allowed={canManagePatients}
          >
            <AddPatientDialog
              onSuccess={refresh}
            />
          </PermissionGuard>
        }
      />

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name, patient ID, email or phone..."
            className="h-10 w-full rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white outline-none focus:border-red-500"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          className="h-10 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white outline-none focus:border-red-500"
        >
          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

          <option value="Suspended">
            Suspended
          </option>

          <option value="Archived">
            Archived
          </option>
        </select>
      </div>

      {/* Patient List */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          title="No patients found"
          description="Try changing your search or filter options."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg"
            >
              {/* Patient Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">
                    {patient.patientId}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {patient.fullName}
                  </h3>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                  {patient.status}
                </span>
              </div>

              {/* Patient Details */}
              <div className="mt-5 space-y-2 text-sm text-slate-400">
                <p>
                  Email:{" "}
                  <span className="text-slate-200">
                    {patient.email ||
                      "Not provided"}
                  </span>
                </p>

                <p>
                  Phone:{" "}
                  <span className="text-slate-200">
                    {patient.phone ||
                      "Not provided"}
                  </span>
                </p>

                <p>
                  Blood Group:{" "}
                  <span className="text-slate-200">
                    {patient.bloodGroup ||
                      "Not provided"}
                  </span>
                </p>

                <p>
                  Date of Birth:{" "}
                  <span className="text-slate-200">
                    {patient.dateOfBirth ||
                      "Not provided"}
                  </span>
                </p>
              </div>

              {/* Medical Reports Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/dashboard/patients/${patient.id}/reports`
                    )
                  }
                  className="h-10 w-full rounded-lg bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Medical Reports
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}