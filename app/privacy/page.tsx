import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | XMD Official",
  description: "Privacy Policy for the XMD Official Discord Bot and Management Portal.",
};

export default function PrivacyPage() {
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
            <span className="text-red-500 font-semibold">Privacy Policy</span>
          </nav>

          <div className="rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-6 sm:p-12 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="mb-8 border-b border-white/10 pb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
                <span>Department Policy</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                Effective Date: July 21, 2026 • XLANTIS Medical Department
              </p>
            </div>

            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                  1. Information We Collect
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                  <li>Discord User ID and Server Membership Data</li>
                  <li>In-game Medical Duty Logs and Timestamp History</li>
                  <li>Cadet Recruitment Application Dossiers and Evaluation Scores</li>
                  <li>Staff Promotion Records and Command Credentials</li>
                  <li>Digital Verification Badges and Cryptographic Tokens</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                  2. How We Use Information
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                  <li>Active Duty Tracking and Emergency Dispatch Coordination</li>
                  <li>Intake Processing and Cadet Roster Administration</li>
                  <li>Staff Rank Progressions and Evaluation Auditing</li>
                  <li>Community Safety, Integrity and Server Rule Enforcement</li>
                  <li>Secure Two-Way Discord Verification and Role Syncing</li>
                </ul>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                  3. Data Security & Confidentiality
                </h2>
                <p>
                  All patient medical records and staff administrative logs are securely stored in high-security database clusters utilizing Row-Level Security (RLS) policies. Access is strictly restricted to authorized XMD Command personnel.
                </p>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                  4. Third-Party Infrastructure
                </h2>
                <p>
                  XMD Official utilizes Discord APIs for community identity verification and Supabase for cloud database management. We never sell, lease, or monetize user data.
                </p>
              </section>

              <section className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                  5. Contact & Inquiries
                </h2>
                <p>
                  If you have questions or concerns regarding this Privacy Policy, please open an administrative inquiry ticket through the official XMD Discord server.
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