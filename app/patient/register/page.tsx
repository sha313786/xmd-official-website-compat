"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">
            Patient Registration
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Create your XMD patient account
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* Patient ID */}
          <div>
            <label
              htmlFor="patientId"
              className="mb-2 block text-sm font-medium text-white"
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
              placeholder="XMD-P0002"
              required
              disabled={loading}
              autoComplete="off"
              className="h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-white outline-none transition focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              Email
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
              className="h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-white outline-none transition focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white"
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
              placeholder="Create password"
              required
              disabled={loading}
              autoComplete="new-password"
              className="h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-white outline-none transition focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <p className="mt-1 text-xs text-slate-500">
              Minimum 6 characters
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-white"
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
              placeholder="Confirm password"
              required
              disabled={loading}
              autoComplete="new-password"
              className="h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-white outline-none transition focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 font-semibold text-white shadow-lg shadow-red-900/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Patient Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <a
            href="/patient/login"
            className="text-sm text-red-400 transition hover:text-red-300"
          >
            Already have an account? Patient Login
          </a>
        </div>

      </div>
    </main>
  );
}