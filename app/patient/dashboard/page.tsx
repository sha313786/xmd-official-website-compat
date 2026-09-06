"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Patient = {
  id: string;
  patient_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  blood_group: string | null;
  status: string;
};

type MedicalReport = {
  id: string;
  report_name: string;
  report_type: string | null;
  description: string | null;
  file_path: string;
  uploaded_at: string;
};

export default function PatientDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);

  useEffect(() => {
    const loadPatient = async () => {
      setLoading(true);
      setReportsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/patient/login");
        return;
      }

      const { data, error } = await supabase
        .from("patients")
        .select(
          "id, patient_id, full_name, email, phone, date_of_birth, blood_group, status"
        )
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (error || !data) {
        await supabase.auth.signOut();
        router.replace("/patient/login");
        return;
      }

      setPatient(data);
      setLoading(false);

      // Load medical reports belonging to this patient
      const { data: reportsData, error: reportsError } = await supabase
        .from("medical_reports")
        .select(
          "id, report_name, report_type, description, file_path, uploaded_at"
        )
        .eq("patient_id", data.id)
        .order("uploaded_at", { ascending: false });

      if (reportsError) {
        console.error(
          "PATIENT MEDICAL REPORTS ERROR:",
          reportsError
        );
        setReports([]);
      } else {
        setReports(reportsData || []);
      }

      setReportsLoading(false);
    };

    loadPatient();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/patient/login");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">
          Loading patient portal...
        </p>
      </main>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-bold">
              XMD Patient Portal
            </h1>

            <p className="text-xs text-slate-400">
              XLANTIS Medical Department
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500/40 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm text-slate-400">
            Welcome back
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {patient.full_name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Patient ID: {patient.patient_id}
          </p>
        </div>

        {/* Information Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Patient ID
            </p>

            <p className="mt-2 text-lg font-semibold">
              {patient.patient_id}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Blood Group
            </p>

            <p className="mt-2 text-lg font-semibold">
              {patient.blood_group || "Not provided"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Phone
            </p>

            <p className="mt-2 text-lg font-semibold">
              {patient.phone || "Not provided"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Status
            </p>

            <p className="mt-2 text-lg font-semibold capitalize text-green-400">
              {patient.status}
            </p>
          </div>
        </div>

        {/* Patient Information */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">
            Personal Information
          </h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                Full Name
              </p>

              <p className="mt-1">
                {patient.full_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="mt-1">
                {patient.email || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Date of Birth
              </p>

              <p className="mt-1">
                {patient.date_of_birth || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Blood Group
              </p>

              <p className="mt-1">
                {patient.blood_group || "Not provided"}
              </p>
            </div>
          </div>
        </section>

        {/* Medical Reports */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Medical Reports
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Your medical reports will appear here.
              </p>
            </div>
          </div>

          <div className="mt-6">
            {reportsLoading ? (
              <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
                <p className="text-sm text-slate-500">
                  Loading medical reports...
                </p>
              </div>
            ) : reports.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
                <p className="text-slate-500">
                  No reports available yet.
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Reports uploaded by authorized XMD staff will
                  appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.slice(0, 3).map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h4 className="truncate font-semibold text-white">
                        {report.report_name}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        {report.report_type && (
                          <span className="rounded-lg bg-white/5 px-2 py-1">
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
                        <p className="mt-2 truncate text-xs text-slate-500">
                          {report.description}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        router.push("/patient/reports")
                      }
                      className="shrink-0 rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-red-500/40 hover:text-red-400"
                    >
                      View Report
                    </button>
                  </div>
                ))}

                {reports.length > 3 && (
                  <button
                    onClick={() =>
                      router.push("/patient/reports")
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                  >
                    View all {reports.length} reports
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}