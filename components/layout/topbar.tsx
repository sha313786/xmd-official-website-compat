"use client";

import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth-service";

export default function Topbar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await AuthService.signOut();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-900 px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-200">
          Welcome
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl bg-red-600 px-5 py-2 text-white">
          Notifications
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold text-white">
          FF
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-slate-700 px-5 py-2 font-semibold text-white transition hover:bg-slate-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}