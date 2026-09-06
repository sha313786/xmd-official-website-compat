"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PatientLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
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
    const { data: patient, error: patientError } = await supabase
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
    <main className="flex min-h-screen items-center justify-center bg-[#05052b] px-4 py-8">
      <div className="w-full max-w-[770px] overflow-hidden rounded-xl border border-white/80 bg-[#17104b] shadow-2xl shadow-black/40">
        <div className="grid min-h-[480px] md:grid-cols-2">

          {/* LEFT — SIGN IN */}
          <section className="flex flex-col justify-center bg-gradient-to-br from-[#291275] to-[#19104d] px-8 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-sm text-center">

              <h1 className="text-4xl font-bold tracking-tight text-white">
                Sign in
              </h1>

              {/* XMD Mark */}
              <div className="mx-auto mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-red-500 text-xs font-bold text-white">
                XMD
              </div>

              <p className="mt-5 text-sm text-slate-300">
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

                {/* Login */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 h-11 min-w-[145px] rounded-full bg-gradient-to-r from-[#8b0000] via-red-600 to-red-500 px-8 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/30 transition hover:scale-[1.03] hover:shadow-red-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Patient Login"}
                </button>
              </form>

              <p className="mt-7 text-xs text-slate-400">
                Secure XMD Patient Portal
              </p>
            </div>
          </section>

          {/* RIGHT — WELCOME */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#21158c] via-[#20168f] to-[#26168e] px-8 py-12 text-center">

            {/* Decorative glow */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative z-10 max-w-sm">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-indigo-200">
                XLANTIS MEDICAL DEPARTMENT
              </p>

              <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
                Hello, Patient!
              </h2>

              <p className="mt-5 text-sm leading-6 text-indigo-100">
                Access your medical reports and
                securely manage your XMD patient
                information.
              </p>

              {/* Website button */}
              <Link
                href="/"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-black/60 px-8 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                XMD Website
              </Link>

              {/* Staff login */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs text-indigo-200">
                  XMD Staff?
                </p>

                <Link
                  href="/login"
                  className="mt-2 inline-block text-sm font-semibold text-white underline decoration-red-500 decoration-2 underline-offset-4 transition hover:text-red-300"
                >
                  Staff Login
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}