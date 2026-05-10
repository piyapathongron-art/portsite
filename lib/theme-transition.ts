"use client";

// View Transitions API isn't in older lib.dom typings; narrow it locally
// so we can feature-detect without `any`.
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => unknown;
};

type SetTheme = (theme: string) => void;

/**
 * Toggles the theme with a radial-reveal transition emanating from the
 * click coordinates. Falls back to an instant swap when the browser lacks
 * `document.startViewTransition` (Firefox today) or the user prefers
 * reduced motion.
 *
 * The class on <html> is flipped *synchronously* inside the transition
 * callback so the View Transitions snapshot captures the new theme state
 * immediately — next-themes' async useEffect reconciles to a no-op.
 */
export function runThemeTransition(
  setTheme: SetTheme,
  nextTheme: "light" | "dark",
  event: { clientX: number; clientY: number },
) {
  const root = document.documentElement;
  root.style.setProperty("--reveal-x", `${event.clientX}px`);
  root.style.setProperty("--reveal-y", `${event.clientY}px`);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startViewTransition = (document as ViewTransitionDocument)
    .startViewTransition;

  if (!startViewTransition || reduced) {
    setTheme(nextTheme);
    return;
  }

  startViewTransition.call(document, () => {
    root.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
  });
}
