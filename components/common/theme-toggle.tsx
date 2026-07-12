"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 transition hover:border-medical-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
    >
      {ready && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
