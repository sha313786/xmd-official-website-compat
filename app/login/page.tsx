"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { signInWithDiscord } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
        <h1 className="text-center text-4xl font-black text-white">
          XMD Portal
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Login to access the XMD Management Portal
        </p>

        <button
          onClick={signInWithDiscord}
          className="mt-10 w-full rounded-xl bg-indigo-600 py-4 text-lg font-bold text-white transition hover:bg-indigo-700"
        >
          Login with Discord
        </button>

        <Link
          href="/"
          className="mt-6 block text-center text-red-500 hover:text-red-400"
        >
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}