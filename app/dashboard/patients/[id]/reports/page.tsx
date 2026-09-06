"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { AddReportDialog } from "@/components/patients/add-report-dialog";

interface Patient {
  id: string;
  patient_id: string;
  full_name: string;
  email: string | null;
}

interface MedicalReport {
  id: string;
  report_name: string;
  report_type: string | null;
  description: string | null;
  file_path: string;
  uploaded_at: string;
}

export default function PatientReportsPage() {
  const params = useParams();
  const router = useRouter();

  const patientId = params.id as string;

  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [reports, setReports] =
    useState<MedicalReport[]>([]);

  const [loading, setLoading] = useState(true);
  const [reportsLoading, setReportsLoading] =
    useState(true);

  const [error, setError] = useState("");

  async function loadReports(id: string) {
    const supabase = createClient();

    setReportsLoading(true);

    const { data, error } = await supabase
      .from("medical_reports")
      .select(
        `
          id,
          report_name,
          report_type,
          description,
          file_path,
          uploaded_at
        `
      )
      .eq("patient_id", id)
      .order("uploaded_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "MEDICAL REPORTS LOAD ERROR:",
        error
      );

      setReports([]);
    } else {
      setReports(data || []);
    }

    setReportsLoading(false);
  }

  useEffect(() => {
    async function loadPatient() {
      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        const { data, error } = await supabase
          .from("patients")
          .select(
            "id, patient_id, full_name, email"
          )
          .eq("id", patientId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setPatient(data);

        await loadReports(data.id);
      } catch (error) {
        console.error(
          "PATIENT REPORT PAGE ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load patient."
        );

        setReportsLoading(false);
      } finally {
        setLoading(false);
      }
    }

    if (patientId) {
      loadPatient();
    }
  }, [patientId]);

  const handleDownload = async (
    report: MedicalReport
  ) => {
    try {
      const supabase = createClient();

      const { data, error } =
        await supabase.storage
          .from("medical-reports")
          .createSignedUrl(
            report.file_path,
            60
          );

      if (error || !data?.signedUrl) {
        alert(
          "Unable to generate the report download link."
        );
        return;
      }

      window.open(
        data.signedUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      console.error(
        "REPORT DOWNLOAD ERROR:",
        error
      );

      alert(
        "Unable to download this report."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">
          Loading patient...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/patients"
            )
          }
          className="text-sm text-red-400 hover:text-red-300"
        >
          ← Back to Patient Directory
        </button>

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/patients"
            )
          }
          className="text-sm text-red-400 hover:text-red-300"
        >
          ← Back to Patient Directory
        </button>

        <p className="text-slate-400">
          Patient not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard/patients"
          )
        }
        className="text-sm text-slate-400 transition hover:text-white"
      >
        ← Back to Patient Directory
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Patient
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Medical Reports
          </h1>

          <div className="mt-3 space-y-1 text-sm">
            <p className="text-slate-300">
              <span className="text-slate-500">
                Patient ID:
              </span>{" "}
              {patient.patient_id}
            </p>

            <p className="text-slate-300">
              <span className="text-slate-500">
                Name:
              </span>{" "}
              {patient.full_name}
            </p>

            <p className="text-slate-300">
              <span className="text-slate-500">
                Email:
              </span>{" "}
              {patient.email ||
                "Not provided"}
            </p>
          </div>
        </div>

        {/* Add Report */}
        <AddReportDialog
          patientId={patient.id}
          onSuccess={() => {
            loadReports(patient.id);
          }}
        />
      </div>

      {/* Reports */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Reports
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Medical reports uploaded for this patient.
          </p>
        </div>

        {reportsLoading ? (
          <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-white/10">
            <p className="text-sm text-slate-500">
              Loading medical reports...
            </p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-white/10">
            <div className="text-center">
              <p className="text-slate-300">
                No medical reports available yet.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Click "+ Add Report" to upload a report.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {report.report_name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      {report.report_type && (
                        <span className="rounded-lg bg-white/5 px-2.5 py-1">
                          {report.report_type}
                        </span>
                      )}

                      <span>
                        {new Date(
                          report.uploaded_at
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {report.description && (
                      <p className="mt-3 text-sm text-slate-400">
                        {report.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(report)
                    }
                    className="shrink-0 rounded-xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:scale-[1.02]"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}