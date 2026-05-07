# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager: **pnpm** (`pnpm-workspace.yaml`, `pnpm-lock.yaml` present). Do not introduce npm/yarn lockfiles.

- `pnpm dev` — Next.js dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)

There is no test runner configured.

## Stack

- Next.js **16.2.4** App Router, React **19.2.4**
- Tailwind CSS **v4** via `@tailwindcss/postcss`. Tailwind config lives **inline in `app/globals.css`** using `@theme` and `@utility` at-rules. There is no `tailwind.config.ts`; do not create one.
- Framer Motion, `typeit-react`, `react-icons` (`fa`, `si`), `lucide-react`
- Path alias: `@/*` → repo root (e.g. `@/components/features/TechStack`)

`GEMINI.md` describes an aspirational structure (Supabase, Prisma, Zustand, `server/`, `lib/`, `hooks/`, etc.). **None of those directories or dependencies exist yet.** Don't assume them; the actual tree is just `app/`, `components/features/`, `public/`.

## Architecture

Single-page scroll-driven portfolio. The whole experience lives in `app/page.tsx` and is built around one mechanism worth understanding before editing it:

**The 400vh / sticky / horizontal-translate pattern (`app/page.tsx`):**

- Outer container is `h-[400vh]` with a `sticky top-0 h-screen` child. The user scrolls 4 viewport heights but the visible content stays pinned.
- `useScroll({ target: containerRef, offset: ["start start", "end end"] })` produces `scrollYProgress` (0→1) over that range.
- `useTransform` maps `scrollYProgress` to: loader fade/scale, content fade-in, background `</>` glyph translate, and `horizontalX` (`0% → -50%`) applied to a `w-[200vw]` flex row.
- That `w-[200vw]` row currently holds two `w-screen` sections: the hero banner (inline) and `<TechStack />`. **Adding a section means widening the row (e.g. `w-[300vw]`), updating the `-50%` end value, and retuning the scroll ranges.** Container height, row width, and translate end are coupled — change them together.
- A separate mouse-parallax layer (`mouseX`/`mouseY` → `useSpring` → `useTransform` for `x/y/rotateX/rotateY`) animates the giant background `</>` glyph independently of scroll.

**Component boundaries:**

- `app/page.tsx` is a Client Component (`"use client"`) because of motion hooks and `useEffect`. `app/layout.tsx` stays a Server Component and wires `Inter` + `Geist_Mono` via `next/font/google` as CSS variables.
- `components/features/` holds section components consumed by `page.tsx`. Each is expected to fill `w-screen h-full` so it slots into the horizontal scroller. `components/ui/` does not exist yet.

**Styling conventions:**

- Custom keyframes (`marquee`, `fade-up`, `fade-up2`) and animation-delay utilities (`delay-100`…`delay-1000`) are declared in `app/globals.css`. Reuse those before adding new ones.
- Palette is dark-first: `#030303` background, zinc scale, `orange-500` accent. New sections should match.

## Next.js 16 caveat

Per `AGENTS.md`: this is **not** the Next.js you may know from training data. Before using an API you're unsure about (caching, `cookies()`/`headers()`, route handlers, dynamic `params`, image, fonts, middleware), consult `node_modules/next/dist/docs/` in this repo rather than relying on memory.

## Core Mandates

### 1. NO MAGIC — ห้ามเดา
*   All assumptions must be explicit.
*   If context is missing, state assumptions clearly.
*   Do not hallucinate hidden infrastructure or invent unspecified services.

### 2. VERIFY BEFORE DONE — ห้ามบอกว่าเสร็จถ้ายังไม่เช็ค
*   Never claim a change is complete without running verification.
*   "I edited the file" is **NOT** done.
*   "I edited the file and here is the output/test result" **IS** done.
*   No "should work now." Provide evidence before assertions, always.

### 3. SCOPE DRIFT DETECTION — จับ scope creep
*   Track stated goals vs. actual execution.
*   Flag and stop when:
    *   "Just one more thing" starts accumulating.
    *   Nice-to-haves are treated as must-haves.
    *   The task drifts from "fix bug X" to "refactoring the entire module."

### 4. R0 / R1 / R2 — ระดับความถอยกลับได้ (Change Management)
*   **R0 (Irreversible):** High impact, cannot be easily undone. **STOP.** Ask for explicit permission before proceeding.
*   **R1 (Costly to reverse):** Significant effort to undo. **Proceed**, but explicitly state *why* this path was chosen.
*   **R2 (Easily reversed):** Low risk, simple to undo. **Just do it.** No permission needed.
