import Link from "next/link";
import { ChevronRight, Clock, ShieldCheck, HeartPulse, AlertTriangle, Sparkles } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/home/footer";
import { RecruitmentApplicationForm } from "@/components/recruitment/recruitment-application-form";

export const metadata = {
  title: "Recruitment Application | XLANTIS Medical Department",
  description:
    "Official application form for cadet enrollment into the XLANTIS Medical Department (XMD).",
};

export default function RecruitmentApplyPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030508] pt-28 pb-24 md:pt-36 md:pb-32">
        {/* Dynamic Pitch Black + Crimson Emergency Glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(139,0,0,0.28),transparent_75%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-48 top-2/3 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

        <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
            <Link href="/recruitment" className="transition hover:text-white">
              Recruitment
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-red-500 font-semibold">Application Dossier</span>
          </nav>

          {/* Header Banner */}
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 shadow-[0_0_20px_rgba(220,38,38,0.25)] backdrop-blur-md">
              <HeartPulse className="h-3.5 w-3.5 text-red-500 animate-pulse" />
              <span>Official Department Application • 2026</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Cadet Recruitment <span className="text-red-500">Application</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              Step forward to join the emergency medical vanguard of XLANTIS City. Answer every evaluation prompt with clarity, realism, and attention to detail.
            </p>

            {/* Quick Requirements Bar */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3.5 rounded-2xl border border-red-950/80 bg-black/80 p-4 shadow-[0_0_25px_rgba(220,38,38,0.06)] backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500 ring-1 ring-red-500/30">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">5–10 Minutes</p>
                  <p className="text-[11px] text-zinc-400">Estimated Duration</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-red-950/80 bg-black/80 p-4 shadow-[0_0_25px_rgba(220,38,38,0.06)] backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500 ring-1 ring-red-500/30">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">18+ Requirement</p>
                  <p className="text-[11px] text-zinc-400">Out-of-Character Age</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-red-950/80 bg-black/80 p-4 shadow-[0_0_25px_rgba(220,38,38,0.06)] backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500 ring-1 ring-red-500/30">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Medical Neutrality</p>
                  <p className="text-[11px] text-zinc-400">Impartial Care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <RecruitmentApplicationForm />

        </div>
      </main>

      <Footer />
    </>
  );
}