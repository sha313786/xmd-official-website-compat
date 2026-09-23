"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleDiscordLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Discord login error:", error);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030508] px-4 py-12">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,0,0,0.25),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Back to Home Button */}
      <div className="relative z-10 mb-6 flex w-full max-w-[900px] items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-white/10 hover:text-white active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-red-400" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-[900px] overflow-hidden rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">

        <div className="grid min-h-[520px] md:grid-cols-2">

          {/* LEFT — STAFF LOGIN */}
          <section className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c0d14] via-[#10111a] to-[#0c0d14] px-8 py-14 sm:px-12 border-b md:border-b-0 md:border-r border-white/10">

            {/* Red glow */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-sm text-center">

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Staff <span className="text-red-500">Portal</span>
              </h1>

              <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

              <p className="mt-4 text-xs sm:text-sm text-zinc-400">
                Sign in with Discord to access the XMD Command Portal
              </p>

              <button
                type="button"
                onClick={handleDiscordLogin}
                className="mt-8 h-13 w-full rounded-xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-101 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] cursor-pointer"
              >
                Login with Discord
              </button>

              <p className="mt-6 text-xs text-zinc-400">
                Authorized Personnel Only • Confidential
              </p>

            </div>
          </section>

          {/* RIGHT — WELCOME */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#300808] via-[#200505] to-[#0c0d14] px-8 py-14 text-center">

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-black/40 blur-3xl" />

            <div className="relative z-10 max-w-sm">

              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-red-400">
                XLANTIS MEDICAL DEPARTMENT
              </p>

              <h2 className="mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                WELCOME,
                <br />
                COMMAND!
              </h2>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
                Access the official department dashboard to manage duty shifts,
                patient records, promotion cycles, and cadet rosters.
              </p>

              {/* Website */}
              <Link
                href="/"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-red-500/50 hover:bg-white/10"
              >
                Return to Website
              </Link>

              {/* Divider */}
              <div className="my-8 h-px w-full bg-white/10" />

              {/* Patient Portal */}
              <p className="text-xs sm:text-sm text-zinc-400">
                Looking for the civilian patient portal?
              </p>

              <Link
                href="/patient/login"
                className="mt-2 inline-block text-xs sm:text-sm font-bold text-red-400 underline decoration-red-500/50 decoration-2 underline-offset-4 transition hover:text-red-300"
              >
                Patient Portal Login →
              </Link>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}