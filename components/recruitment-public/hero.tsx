"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Clock3,
  HeartPulse,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export default function RecruitmentHero() {
  const { settings, loading } = useRecruitmentSettings();

  const isOpen = settings?.is_open ?? false;

  return (
    <section className="relative overflow-hidden border-b border-red-950/80 bg-[#030508]">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(139,0,0,0.28),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 top-2/3 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="container relative mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          {/* Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="rounded-2xl bg-red-600/20 p-4 sm:p-5 ring-1 ring-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              <HeartPulse className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 animate-pulse" />
            </div>
          </div>

          {/* Status */}
          <div className="mb-5 sm:mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {loading ? (
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-3.5 py-1 text-xs sm:text-sm text-zinc-300"
              >
                Checking Status...
              </Badge>
            ) : (
              <Badge
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold shadow-lg ${
                  isOpen
                    ? "bg-emerald-600/90 text-white ring-1 ring-emerald-400 shadow-emerald-600/20"
                    : "bg-red-600/90 text-white ring-1 ring-red-400 shadow-red-600/20"
                }`}
              >
                {isOpen
                  ? "🟢 Recruitment Open"
                  : "🔴 Recruitment Closed"}
              </Badge>
            )}

            <Badge
              variant="outline"
              className="rounded-full border-red-950/80 bg-[#0c0d14]/90 px-3.5 py-1 text-xs sm:text-sm text-zinc-300"
            >
              <Clock3 className="mr-1.5 h-3.5 w-3.5 text-red-400" />
              5–10 Minutes
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Join the <span className="text-red-500">XMD</span> Emergency Vanguard
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-sm sm:text-lg leading-relaxed text-zinc-300 px-2">
            Step forward into the emergency medical vanguard of XLANTIS City. Answer every evaluation prompt with clarity, realism, and attention to detail.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            {isOpen ? (
              <Link href="/recruitment/apply" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] text-white font-bold shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] cursor-pointer"
                >
                  Start Cadet Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" disabled className="w-full sm:w-auto h-13 px-8 rounded-xl bg-zinc-800 text-zinc-400">
                Recruitment Currently Closed
              </Button>
            )}

            {settings?.discord_invite && (
              <Link
                href={settings.discord_invite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 rounded-xl border border-white/15 bg-white/5 text-white font-semibold backdrop-blur-md hover:border-red-500/50 hover:bg-white/10"
                >
                  Join Official Discord
                </Button>
              </Link>
            )}
          </div>

          {/* Features */}
          <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 ring-1 ring-red-500/40">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">24/7 Response</h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Always active to deploy rapidly across all districts of XLANTIS.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 ring-1 ring-red-500/40">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">Elite Medical Roleplay</h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Immersive clinical procedures, radio ten-codes, and patient triage.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 ring-1 ring-red-500/40">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">Clear Merit Progression</h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Structured promotion cycles from Cadet to Chief of Department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}