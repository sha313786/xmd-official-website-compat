import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "Terms of Service | XMD Official",
  description: "Terms of Service for the XMD Official Discord Bot and Management Portal.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030508] pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background Glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-red-500 font-semibold">Terms of Service</span>
          </nav>

          <div className="rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-6 sm:p-12 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="mb-8 border-b border-white/10 pb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
                <FileText className="h-3.5 w-3.5 text-red-500" />
                <span>Department Policy</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                Effective Date: July 21, 2026 • XLANTIS Medical Department
              </p>
            </div>

            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or utilizing the XMD Official Website, Discord Bot integrations, or Staff/Patient Portals, you unconditionally agree to abide by these Terms of Service and all related XLANTIS city community regulations.
                </p>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">2. Service Scope & Purpose</h2>
                <p>
                  XMD Official is built to support the operational management of the XLANTIS Medical Department, including cadet recruitment, duty shift tracking, promotion cycles, clinical verification, incident reporting, and server administration.
                </p>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">3. Acceptable Use Policy</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                  <li>Do not tamper with, exploit, or attempt SQL/API injection against portal endpoints.</li>
                  <li>Do not forge medical reports, cadet dossiers, or duty timestamps.</li>
                  <li>Maintain medical roleplay neutrality and follow Discord&apos;s global Terms of Service.</li>
                  <li>Comply with department hierarchy, command orders, and server guidelines.</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">4. Availability & Maintenance</h2>
                <p>
                  We strive to ensure maximum availability of the emergency dispatch and personnel portals. Scheduled maintenance or emergency upgrades may occur with prior notice via official Discord announcements.
                </p>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">5. Disciplinary Actions & Termination</h2>
                <p>
                  Breaches of these terms, plagiarism on recruitment applications, corruption in medical roleplay, or harassment will result in immediate portal access revocation, discharge, and permanent departmental blacklisting.
                </p>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">6. Support & Inquiries</h2>
                <p>
                  For clarification or appeals regarding these Terms, contact the XMD Management Team through the official Discord server ticket portal.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}