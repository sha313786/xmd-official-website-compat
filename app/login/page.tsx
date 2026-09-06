"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <main className="flex min-h-screen items-center justify-center bg-[#020617] px-4 py-8">

      <div className="w-full max-w-[900px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/60">

        <div className="grid min-h-[520px] md:grid-cols-2">

          {/* LEFT — STAFF LOGIN */}
          <section className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] px-8 py-14 sm:px-12">

            {/* Red glow */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-sm text-center">

              <h1 className="text-4xl font-bold tracking-tight text-white">
                Staff Login
              </h1>

              <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-red-600" />

              <p className="mt-6 text-sm text-slate-400">
                Sign in to access the XMD Management Portal
              </p>

              <button
                type="button"
                onClick={handleDiscordLogin}
                className="mt-10 h-12 w-full rounded-xl bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#ef4444] px-8 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/30"
              >
                Login with Discord
              </button>

              <p className="mt-7 text-xs text-slate-500">
                Secure XMD Staff Portal
              </p>

            </div>
          </section>

          {/* RIGHT — WELCOME */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#991b1b] px-8 py-14 text-center">

            {/* Decorative glow */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-black/20 blur-3xl" />

            <div className="relative z-10 max-w-sm">

              <p className="text-sm font-medium uppercase tracking-[0.25em] text-red-100">
                XLANTIS MEDICAL DEPARTMENT
              </p>

              <h2 className="mt-5 text-4xl font-extrabold uppercase tracking-wide text-white">
                WELCOME,
                <br />
                STAFF!
              </h2>

              <p className="mt-6 text-sm leading-6 text-red-50/90">
                Access the XMD Management Portal
                <br />
                and manage your department securely.
              </p>

              {/* Website */}
              <Link
                href="/"
                className="mt-9 inline-flex h-11 items-center justify-center rounded-xl border border-white/30 px-8 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                XMD Website
              </Link>

              {/* Divider */}
              <div className="my-10 h-px w-full bg-white/20" />

              {/* Patient Portal */}
              <p className="text-sm text-red-100">
                Looking for the patient portal?
              </p>

              <Link
                href="/patient/login"
                className="mt-3 inline-block text-sm font-bold text-white underline decoration-red-300 decoration-2 underline-offset-4 transition hover:text-red-200"
              >
                Patient Login
              </Link>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}