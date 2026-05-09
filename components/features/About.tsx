"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, GraduationCap, Clock, Layers } from "lucide-react";
import type { ComponentType } from "react";

type Vital = {
  id: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  sub: string;
};

const VITALS: Vital[] = [
  {
    id: "location",
    icon: MapPin,
    label: "Location",
    value: "Germany",
    sub: "Originally from Thailand",
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Education",
    value: "Fullstack + Media",
    sub: "CodeCamp & BA Innovative Media",
  },
  {
    id: "experience",
    icon: Clock,
    label: "Experience",
    value: "3+ Years",
    sub: "Production-ready apps",
  },
  {
    id: "focus",
    icon: Layers,
    label: "Core Focus",
    value: "Full Stack",
    sub: "Frontend · Backend · Database",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const dur = shouldReduceMotion ? 0 : 0.65;

  return (
    <div className="w-full h-full relative pointer-events-auto overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 px-10 md:px-16 pt-24 pb-12 items-center">

        {/* ── LEFT — badge + hook + philosophy ── */}
        <div className="flex flex-col gap-5 min-w-0">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.08, ease: EASE }}
            className="inline-flex w-fit items-center rounded-full border border-orange-500/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-500 md:text-xs"
          >
            01 About
          </motion.span>

          {/* Hook heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.18, ease: EASE }}
          >
            <h2 className="text-3xl md:text-4xl xl:text-[2.75rem] font-bold leading-[1.1] tracking-tighter text-white">
              I build{" "}
              <span className="text-orange-400">full-stack</span>{" "}
              web products
              <br className="hidden sm:block" />
              {" "}that are{" "}
              <span className="text-orange-400">fast, clean,</span>{" "}
              and{" "}
              <span className="text-orange-400">ready to ship.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm md:text-base text-zinc-400 leading-relaxed">
              With a focus on modern frameworks, I work across the entire
              stack — from robust database schemas to pixel-perfect UIs —
              and I speak both engineer and client fluently.
            </p>
          </motion.div>

          {/* Philosophy card — hidden on small screens to preserve layout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: 0.32, ease: EASE }}
            className="hidden md:block rounded-2xl border border-zinc-800/60 bg-white/[0.02] p-5 xl:p-6"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-600 mb-3">
              Philosophy &amp; Depth
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              I architect systems using{" "}
              <Chip>React</Chip>,{" "}
              <Chip>Next.js</Chip>,{" "}
              <Chip>TypeScript</Chip>, and{" "}
              <Chip>Node.js</Chip>.
              {" "}What separates my work is a focus on the{" "}
              <em className="not-italic text-orange-400 font-medium">why</em>.
              {" "}I choose <Chip>Prisma</Chip> because schema migrations
              should be version-controlled. I leverage{" "}
              <Chip>Zustand</Chip> to avoid boilerplate and keep sprint
              velocity high. Whether it&apos;s live bi-directional sync with{" "}
              <Chip>Socket.io</Chip> or a standard REST API, I build
              systems that handle <Chip>real traffic</Chip> and{" "}
              <Chip>real users</Chip>.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT — status + vitals ── */}
        <div className="flex flex-col gap-3">

          {/* Status card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: dur, delay: 0.22, ease: EASE }}
            className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-5"
          >
            <div className="flex items-center gap-2 mb-1.5">
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-orange-500">
                Status
              </span>
            </div>
            <p className="text-white font-bold text-base leading-tight">
              Available Now
            </p>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              Open to freelance projects &amp; full-time roles
            </p>
          </motion.div>

          {/* Vitals 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {VITALS.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur, delay: 0.30 + i * 0.07, ease: EASE }}
                className="group rounded-xl border border-zinc-800/60 bg-white/[0.02] p-4 flex flex-col gap-2.5 transition-colors duration-200 hover:border-zinc-700 hover:bg-white/[0.04]"
              >
                <v.icon
                  size={15}
                  className="text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400"
                />
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-600 mb-0.5">
                    {v.label}
                  </p>
                  <p className="text-sm font-bold text-white leading-tight">
                    {v.value}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                    {v.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hairline separator at the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-10 md:left-16 right-10 md:right-16 h-px bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent"
      />
    </div>
  );
}

/** Inline tech-term highlight — white/medium weight, no distracting colour */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-zinc-200">{children}</span>
  );
}
