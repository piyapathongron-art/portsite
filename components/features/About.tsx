"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
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

// Shared variant factories — duration collapses to 0 when reduce-motion is on.
function makeSlideUp(dur: number, delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, delay, ease: EASE },
    },
  };
}

function makeSlideRight(dur: number, delay: number): Variants {
  return {
    hidden: { opacity: 0, x: 18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: dur, delay, ease: EASE },
    },
  };
}

// ─── Animated orange glow word ───────────────────────────────────────────────
// Starts dim (opacity 0.45, no glow) and brightens to full with a warm halo.
// Used on key hook phrases to catch the Tech Lead's / HR's eye.
function GlowWord({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.span
      className="text-orange-400"
      initial={{ opacity: reduced ? 1 : 0.35, textShadow: "0 0 0px rgba(251,146,60,0)" }}
      whileInView={{
        opacity: 1,
        textShadow: reduced
          ? "0 0 0px rgba(251,146,60,0)"
          : "0 0 22px rgba(251,146,60,0.38)",
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reduced ? 0 : 1.1, delay, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

// ─── Inline tech-term chip ───────────────────────────────────────────────────
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-zinc-100">{children}</span>;
}

// ─── About ───────────────────────────────────────────────────────────────────
export function About() {
  const reduced = useReducedMotion() ?? false;
  const d = reduced ? 0 : 1; // duration multiplier

  return (
    <div className="w-full h-full relative pointer-events-auto overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 px-10 md:px-16 pt-24 pb-12 items-center">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 min-w-0">

          {/* Badge — outlined section number + orange pill */}
          <motion.div
            variants={makeSlideUp(d * 0.55, 0.10)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-3"
          >
            <span
              className="text-5xl md:text-6xl font-black tracking-tighter text-transparent leading-none select-none"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)" }}
            >
              01
            </span>
            <span className="rounded-full border border-orange-500/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-500 md:text-xs">
              About
            </span>
          </motion.div>

          {/* Hook heading — sequence: 1st */}
          <motion.div
            variants={makeSlideUp(d * 0.75, 0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl xl:text-[2.75rem] font-bold leading-[1.1] tracking-tighter text-white">
              I build{" "}
              <GlowWord delay={0.40} reduced={reduced}>full-stack</GlowWord>
              {" "}web products
              <br className="hidden sm:block" />
              {" "}that are{" "}
              <GlowWord delay={0.52} reduced={reduced}>fast, clean,</GlowWord>
              {" "}and{" "}
              <GlowWord delay={0.64} reduced={reduced}>ready to ship.</GlowWord>
            </h2>
            <motion.p
              variants={makeSlideUp(d * 0.65, 0.28)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-4 max-w-lg text-sm md:text-base text-zinc-400 leading-relaxed"
            >
              With a focus on modern frameworks, I work across the entire
              stack — from robust database schemas to pixel-perfect UIs —
              and I speak both engineer and client fluently.
            </motion.p>
          </motion.div>

          {/* Philosophy card — sequence: last */}
          <motion.div
            variants={makeSlideUp(d * 0.70, 0.72)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={[
              "hidden md:block rounded-2xl border border-zinc-800/60 bg-white/[0.02] p-5 xl:p-6",
              "cursor-default transition-all duration-500 ease-out",
              "hover:-translate-y-0.5 hover:border-zinc-700/70 hover:bg-white/[0.035]",
              "hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)]",
            ].join(" ")}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-600 mb-3">
              Philosophy &amp; Depth
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              I architect systems using{" "}
              <Chip>React</Chip>, <Chip>Next.js</Chip>,{" "}
              <Chip>TypeScript</Chip>, and <Chip>Node.js</Chip>.
              {" "}What separates my work is a focus on the{" "}
              <em className="not-italic text-orange-400 font-medium">why</em>.
              {" "}I choose <Chip>Prisma</Chip> because schema migrations
              should be version-controlled. I leverage{" "}
              <Chip>Zustand</Chip> to avoid boilerplate and keep sprint
              velocity high. Whether it&apos;s live bi-directional sync
              with <Chip>Socket.io</Chip> or a standard REST API, I build
              systems that handle <Chip>real traffic</Chip> and{" "}
              <Chip>real users</Chip>.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">

          {/* Status card — sequence: 2nd (before vitals) */}
          <motion.div
            variants={makeSlideRight(d * 0.70, 0.36)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={[
              "rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-5",
              "cursor-default transition-all duration-500 ease-out",
              "hover:scale-[1.015] hover:border-orange-500/35",
              "hover:shadow-[0_0_32px_-6px_rgba(249,115,22,0.20)]",
            ].join(" ")}
          >
            <div className="flex items-center gap-2 mb-1.5">
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

          {/* Vitals 2×2 grid — sequence: 3rd (staggered) */}
          <div className="grid grid-cols-2 gap-3">
            {VITALS.map((v, i) => (
              <motion.div
                key={v.id}
                variants={makeSlideUp(d * 0.65, 0.44 + i * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={[
                  "group rounded-xl border border-zinc-800/60 bg-white/[0.02] p-4 flex flex-col gap-2.5",
                  "cursor-default transition-all duration-500 ease-out",
                  "hover:-translate-y-[3px] hover:border-zinc-700/80 hover:bg-white/[0.04]",
                  "hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.50)]",
                ].join(" ")}
              >
                <v.icon
                  size={15}
                  className="text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400"
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

      {/* Hairline separator */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-10 md:left-16 right-10 md:right-16 h-px bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent"
      />
    </div>
  );
}
