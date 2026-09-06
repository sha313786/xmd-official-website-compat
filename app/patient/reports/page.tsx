"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Report = {
  id: string;
  report_name: string;
  report_type: string | null;
  description: string | null;
  file_path: string;
  uploaded_at: string;
};

export default function PatientReportsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/patient/login");
        return;
      }

      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("id")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (patientError || !patient) {
        await supabase.auth.signOut();
        router.replace("/patient/login");
        return;
      }

      const { data, error: reportsError } = await supabase
        .from("medical_reports")
        .select(
          "id, report_name, report_type, description, file_path, uploaded_at"
        )
        .eq("patient_id", patient.id)
        .order("uploaded_at", { ascending: false });

      if (reportsError) {
        setError("Unable to load your medical reports.");
        setLoading(false);
        return;
      }

      setReports(data || []);
      setLoading(false);
    };

    loadReports();
  }, [router, supabase]);

  const handleDownload = async (report: Report) => {
    try {
      setDownloading(report.id);
      setError("");

      const { data, error } = await supabase.storage
        .from("medical-reports")
        .createSignedUrl(report.file_path, 60);

      if (error || !data?.signedUrl) {
        setError("Unable to generate the report download link.");
        setDownloading(null);
        return;
      }

      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch {
      setError("Unable to download this report.");
    } finally {
      setDownloading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/patient/login");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Loading medical reports...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-bold">XMD Patient Portal</h1>
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

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <button
          onClick={() => router.push("/patient/dashboard")}
          className="mb-6 text-sm text-slate-400 transition hover:text-red-400"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold">Medical Reports</h2>

          <p className="mt-2 text-sm text-slate-400">
            View and securely download your medical reports.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {reports.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-12 text-center">
            <h3 className="text-lg font-semibold">
              No medical reports
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your medical reports will appear here when they are
              uploaded by authorized XMD staff.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-white/20"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {report.report_name}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                      {report.report_type && (
                        <span className="rounded-lg bg-white/5 px-3 py-1">
                          {report.report_type}
                        </span>
                      )}

                      <span>
                        {new Date(report.uploaded_at).toLocaleDateString()}
                      </span>
                    </div>

                    {report.description && (
                      <p className="mt-3 text-sm text-slate-400">
                        {report.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDownload(report)}
                    disabled={downloading === report.id}
                    className="shrink-0 rounded-xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {downloading === report.id
                      ? "Preparing..."
                      : "Download Report"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}