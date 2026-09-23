"use client";

import Link from "next/link";

import Reveal from "@/components/shared/reveal";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  CheckCircle2,
  ExternalLink,
  Lock,
} from "lucide-react";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

const checklist = [
  "Citizen for at least 2 weeks",
  "Active Discord Account",
  "Working Microphone",
  "Gang & Club Members are not eligible",
];

export default function RecruitmentApply() {
  const { settings, loading } = useRecruitmentSettings();

  const isOpen = settings?.is_open ?? false;

  return (
    <section className="relative overflow-hidden py-24 bg-[#030508]">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,0,0,0.3),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-6 sm:p-12 text-center shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">

            {/* Status Badge */}
            {loading ? (
              <Badge className="mb-6 bg-zinc-800 text-zinc-300 px-4 py-1">
                Checking Status...
              </Badge>
            ) : (
              <Badge
                className={`mb-6 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-lg ${
                  isOpen
                    ? "bg-emerald-600/90 text-white ring-1 ring-emerald-400 shadow-emerald-600/20"
                    : "bg-red-600/90 text-white ring-1 ring-red-400 shadow-red-600/20"
                }`}
              >
                {isOpen
                  ? "🟢 Recruitment Active"
                  : "🔴 Recruitment Closed"}
              </Badge>
            )}

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Begin Your Medical Career Today
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-300">
              Join the XMD Medical Department and become part of a professional
              emergency medical team dedicated to serving the community through
              realistic medical roleplay.
            </p>

            {/* Checklist */}
            <div className="mx-auto mt-10 max-w-2xl">
              <h3 className="mb-4 text-base sm:text-lg font-bold uppercase tracking-wider text-red-400">
                Mandatory Prerequisites
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/50 p-4 text-left shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                    <span className="text-xs sm:text-sm font-medium text-zinc-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              {isOpen ? (
                <Link href="/recruitment/apply" className="w-full sm:w-auto">
                  <Button className="h-14 w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] px-10 text-base font-bold text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all hover:scale-102 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] cursor-pointer">
                    Submit Cadet Application
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="h-14 w-full sm:w-auto rounded-xl bg-zinc-800 px-10 text-base font-bold text-zinc-500"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Recruitment Closed
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
                    className="h-14 w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-10 text-base font-semibold text-white backdrop-blur-md hover:border-red-500/50 hover:bg-white/10"
                  >
                    Join Official Discord
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>

            {!isOpen && !loading && (
              <p className="mt-6 text-xs sm:text-sm text-red-400 font-medium">
                Applications are currently closed. Please join our Discord server
                to stay updated on the next recruitment cycle.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}