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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#05052b] px-4 py-8">
      {/* Back to Home Button */}
      <div className="mb-4 flex w-full max-w-[900px] items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-white/10 hover:text-white active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-red-400" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-[900px] overflow-hidden rounded-xl border border-white/80 bg-[#17104b] shadow-2xl shadow-black/40">
        <div className="grid min-h-[520px] md:grid-cols-2">

          {/* =========================================
              LEFT — PATIENT LOGIN
          ========================================== */}
          <section className="flex flex-col justify-center bg-gradient-to-br from-[#291275] to-[#19104d] px-8 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-sm text-center">

              <h1 className="text-4xl font-bold tracking-tight text-white">
                Sign in
              </h1>

              <p className="mt-6 text-sm text-slate-300">
                Sign in to access your patient portal
              </p>

              {error && (
                <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-left text-sm text-red-300">
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
                    placeholder="Email"
                    className="h-11 w-full rounded-full border border-white/20 bg-white px-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
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
                    className="h-11 w-full rounded-full border border-white/20 bg-white px-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 h-11 min-w-[145px] rounded-full bg-gradient-to-r from-[#8b0000] via-red-600 to-red-500 px-8 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/30 transition hover:scale-[1.03] hover:shadow-red-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Signing in..."
                    : "Patient Login"}
                </button>
              </form>

              <p className="mt-7 text-xs text-slate-400">
                Secure XMD Patient Portal
              </p>
            </div>
          </section>

          {/* =========================================
              RIGHT — REGISTER INVITATION
          ========================================== */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#21158c] via-[#20168f] to-[#26168e] px-8 py-12 text-center sm:px-10">

            {/* Decorative glow */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative z-10 max-w-sm">

              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-indigo-200">
                XLANTIS MEDICAL DEPARTMENT
              </p>

              <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
                HELLO,
              </h2>

              <p className="mt-6 text-sm leading-6 text-indigo-100">
                New to XMD Patient Portal?
                <br />
                Create your patient account and securely
                <br />
                access your medical information.
              </p>

              {/* Register Now */}
              <Link
                href="/patient/register"
                className="mt-9 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#8b0000] via-red-600 to-red-500 px-9 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:scale-105 hover:shadow-red-500/50"
              >
                REGISTER NOW
              </Link>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}