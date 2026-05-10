"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { runThemeTransition } from "@/lib/theme-transition";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render a placeholder with the same dimensions to avoid layout shift
  if (!mounted) {
    return <div className="hidden md:block w-[34px] h-[30px]" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={(e) => runThemeTransition(setTheme, isDark ? "light" : "dark", e)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "hidden md:inline-flex items-center justify-center",
        "h-[30px] w-[34px] rounded-lg",
        "border border-zinc-300 dark:border-zinc-700/60",
        "bg-black/[0.04] dark:bg-white/[0.03]",
        "text-zinc-600 dark:text-zinc-400",
        "transition-all duration-300 ease-out cursor-pointer",
        "hover:border-orange-500/50 hover:text-zinc-900 dark:hover:text-white",
        "hover:bg-orange-500/[0.07] hover:shadow-[0_0_16px_-4px_rgba(249,115,22,0.30)]",
      ].join(" ")}
    >
      {isDark
        ? <Sun  size={12} className="transition-transform duration-500 rotate-0"   />
        : <Moon size={12} className="transition-transform duration-500 -rotate-12" />
      }
    </button>
  );
}
