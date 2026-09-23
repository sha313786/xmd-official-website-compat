"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function PatientLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError("Unable to sign in. Please try again.");
      setLoading(false);
      return;
    }

    // Verify that the authenticated account belongs to an XMD patient.
    const { data: patient, error: patientError } =
      await supabase
        .from("patients")
        .select("id")
        .eq("auth_user_id", data.user.id)
        .maybeSingle();

    if (patientError || !patient) {
      await supabase.auth.signOut();

      setError(
        "This account is not registered as an XMD patient."
      );

      setLoading(false);
      return;
    }

    router.push("/patient/dashboard");
    router.refresh();
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030508] px-4 py-12">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,0,0,0.25),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Back to Home Button */}
      <div className="relative z-10 mb-6 flex w-full max-w-[900px] items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-white/10 hover:text-white active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-red-400" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-[900px] overflow-hidden rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="grid min-h-[520px] md:grid-cols-2">

          {/* =========================================
              LEFT — PATIENT LOGIN
          ========================================== */}
          <section className="flex flex-col justify-center bg-gradient-to-br from-[#0c0d14] via-[#10111a] to-[#0c0d14] px-8 py-12 sm:px-12 border-b md:border-b-0 md:border-r border-white/10">
            <div className="mx-auto w-full max-w-sm text-center">

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Patient <span className="text-red-500">Sign In</span>
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-zinc-400">
                Sign in to securely access your medical records & history
              </p>

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-left text-xs sm:text-sm text-red-300">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleLogin}
                className="mt-6 space-y-4"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="sr-only"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Registered Email"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="sr-only"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all hover:scale-101 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {loading
                    ? "Signing in..."
                    : "Access Patient Portal"}
                </button>
              </form>

              <p className="mt-6 text-xs text-zinc-400">
                Confidential • XLANTIS Medical Department
              </p>
            </div>
          </section>

          {/* =========================================
              RIGHT — REGISTER INVITATION
          ========================================== */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a0707] via-[#1a0505] to-[#0c0d14] px-8 py-12 text-center sm:px-10">

            {/* Decorative red glow */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />

            <div className="relative z-10 max-w-sm">

              <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-red-400">
                XLANTIS MEDICAL DEPARTMENT
              </p>

              <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                New Patient?
              </h2>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
                Activate your patient account using your verified Patient ID
                and seamlessly access your clinical care reports.
              </p>

              {/* Register Now */}
              <Link
                href="/patient/register"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all hover:scale-103 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] cursor-pointer"
              >
                Register Patient Account
              </Link>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}