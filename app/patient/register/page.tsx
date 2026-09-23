"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function PatientRegisterPage() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanPatientId = patientId.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanPatientId) {
      setError("Patient ID is required.");
      return;
    }

    if (!cleanEmail) {
      setError("Email is required.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();

      /*
       * STEP 1
       * Find the patient created by XMD staff.
       */
      const {
        data: patient,
        error: patientError,
      } = await supabase
        .from("patients")
        .select(
          "id, patient_id, auth_user_id, email"
        )
        .eq(
          "patient_id",
          cleanPatientId
        )
        .maybeSingle();

      if (patientError) {
        console.error(
          "PATIENT LOOKUP ERROR:",
          patientError
        );

        throw new Error(
          patientError.message
        );
      }

      if (!patient) {
        throw new Error(
          "Patient ID was not found. Please contact XMD staff."
        );
      }

      /*
       * STEP 2
       * Make sure this patient has not already
       * registered an account.
       */
      if (patient.auth_user_id) {
        throw new Error(
          "This patient already has an account. Please use Patient Login."
        );
      }

      /*
       * STEP 3
       * Create the Supabase Auth account.
       */
      const {
        data: authData,
        error: authError,
      } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

      if (authError) {
        console.error(
          "SUPABASE AUTH SIGNUP ERROR:",
          authError
        );

        throw new Error(
          authError.message
        );
      }

      if (!authData.user) {
        throw new Error(
          "Unable to create patient account."
        );
      }

      /*
       * STEP 4
       * Send the Auth user ID to the secure
       * server-side registration API.
       *
       * The server will update:
       *
       * patients.email
       * patients.auth_user_id
       */
      const response = await fetch(
        "/api/patient/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            patientId:
              cleanPatientId,

            email: cleanEmail,

            authUserId:
              authData.user.id,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        console.error(
          "PATIENT LINK ERROR:",
          result
        );

        throw new Error(
          result.error ??
            "Unable to link patient account."
        );
      }

      /*
       * STEP 5
       * Registration completed.
       */
      setSuccess(
        "Patient account created successfully."
      );

      /*
       * Redirect to login after a short delay.
       */
      setTimeout(() => {
        router.push(
          "/patient/login"
        );
      }, 1000);
    } catch (error) {
      console.error(
        "PATIENT REGISTRATION ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030508] px-4 py-12">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,0,0,0.25),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Back to Home Button */}
      <div className="relative z-10 mb-6 flex w-full max-w-md items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-white/10 hover:text-white active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-red-400" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-6 sm:p-8 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Patient <span className="text-red-500">Registration</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-zinc-300">
            Activate your XMD patient credentials
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          {/* Patient ID */}
          <div>
            <label
              htmlFor="patientId"
              className="mb-1.5 block text-xs font-semibold text-zinc-200 uppercase tracking-wider"
            >
              Patient ID
            </label>

            <input
              id="patientId"
              type="text"
              value={patientId}
              onChange={(event) =>
                setPatientId(
                  event.target.value
                )
              }
              placeholder="e.g. XMD-P0002"
              required
              disabled={loading}
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-zinc-200 uppercase tracking-wider"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              required
              disabled={loading}
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold text-zinc-200 uppercase tracking-wider"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Create strong password"
              required
              disabled={loading}
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <p className="mt-1 text-[11px] text-zinc-400">
              Minimum 6 characters
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-semibold text-zinc-200 uppercase tracking-wider"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Re-enter password"
              required
              disabled={loading}
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs sm:text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs sm:text-sm text-emerald-300">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-13 w-full rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] font-bold text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all hover:scale-101 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] active:scale-99 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? "Creating Account..."
              : "Create Patient Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <Link
            href="/patient/login"
            className="text-xs sm:text-sm text-red-400 font-semibold transition hover:text-red-300"
          >
            Already have an account? Patient Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}