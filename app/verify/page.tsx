"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { VerificationService } from "@/services/verification.service";

export default function VerifyPage() {
  const router = useRouter();

  const [badgeNumber, setBadgeNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleVerify() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await VerificationService.verifyMember(
        badgeNumber.trim(),
        verificationCode.trim()
      );

      setSuccess("Verification successful! Redirecting...");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold">
          Discord Verification
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Enter your Badge Number and the verification code
          generated using the Discord <strong>/verify</strong>
          command.
        </p>

        <div className="space-y-4">

          <input
            className="w-full rounded-md border px-4 py-3"
            placeholder="Badge Number"
            value={badgeNumber}
            onChange={(e) =>
              setBadgeNumber(e.target.value)
            }
          />

          <input
            className="w-full rounded-md border px-4 py-3"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value)
            }
          />

          {error && (
            <div className="rounded bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded bg-green-500/10 p-3 text-sm text-green-500">
              {success}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full rounded-md bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Discord"}
          </button>

        </div>
      </div>
    </div>
  );
}