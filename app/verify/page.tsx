"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Loader2, KeyRound } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/home/footer";
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

      setSuccess("Verification successful! Redirecting to command portal...");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please ensure the badge and one-time code are correct."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030508] px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Pitch Black & Crimson Emergency Glows */}
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

        <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-6 sm:p-8 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 ring-1 ring-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Discord Verification
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Enter your assigned Badge Number and the temporary token
              generated using Discord <code className="rounded bg-black/60 px-1.5 py-0.5 text-red-400 font-mono text-xs">/verify</code>.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                Badge Number
              </label>
              <input
                className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white placeholder:text-zinc-400 transition-all focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40 focus:outline-none"
                placeholder="e.g. 101 or XMD-101"
                value={badgeNumber}
                onChange={(e) => setBadgeNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                Verification Token
              </label>
              <input
                className="h-12 w-full rounded-xl border border-white/10 bg-[#12131c] px-4 text-sm text-white placeholder:text-zinc-400 font-mono transition-all focus:border-red-500 focus:bg-[#151622] focus:ring-2 focus:ring-red-600/40 focus:outline-none"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs sm:text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs sm:text-sm text-emerald-300">
                {success}
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={loading}
              className="mt-2 h-13 w-full rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] font-bold text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all hover:scale-101 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] active:scale-99 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating Credentials...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  Authenticate & Link Account
                </span>
              )}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}