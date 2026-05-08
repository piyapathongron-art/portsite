"use client";

import { motion, type MotionValue } from "framer-motion";
import { Check, ArrowUpRight, Code2 } from "lucide-react";

type Project = {
  index: string;
  badge: string;
  overline: string;
  title: string;
  description: string;
  bullets: string[];
  techTags: string[];
  liveDemoUrl?: string;
  sourceUrl?: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    badge: "FEATURED",
    overline: "PO & FULL STACK DEVELOPER",
    title: "WONGNORK",
    description: "Restaurant Discovery & Bill-Splitting Platform.",
    bullets: [
      "Architected a robust relational database schema to handle complex, concurrent bill-splitting calculations and user-party management.",
      "Implemented low-latency, bi-directional communication to power live group chats and dynamic party status synchronizations.",
      "Seamlessly integrated Mapbox for geolocation-based restaurant tracking and Cloudinary for optimized media storage.",
    ],
    techTags: ["MYSQL", "PRISMA", "SOCKET.IO", "MAPBOX", "CLOUDINARY"],
  },
  {
    index: "02",
    badge: "CASE STUDY",
    overline: "FRONTEND & BACKEND DEVELOPMENT",
    title: "TARAVILLE",
    description: "Real Estate Management Dashboard.",
    bullets: [
      "Engineered a responsive internal dashboard featuring interactive data tables to streamline the tracking of customer surveys and property statuses.",
      "Designed and deployed scalable RESTful APIs to manage secure CRUD operations for employee assignments and internal workflows.",
    ],
    techTags: ["REACT.JS", "TAILWIND CSS", "RESTFUL API"],
  },
  {
    index: "03",
    badge: "RECENT",
    overline: "MODERN STACK IMPLEMENTATION",
    title: "THANTHONG DAILY GOLD",
    description: "Gold Price Tracking Platform.",
    bullets: [
      "Expanded technical expertise by rapidly adopting modern frameworks to build a dynamic, SEO-friendly web application with strict type safety.",
      "Leveraged highly efficient global state management, seamlessly syncing live gold prices and promotional data across interactive UI components and sliders.",
    ],
    techTags: ["NEXT.JS", "TYPESCRIPT", "ZUSTAND"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-screen h-full shrink-0 flex items-center justify-center px-12 pt-72 pb-12">
      <article className="relative w-full max-w-[1480px] h-full max-h-[640px] rounded-3xl border border-zinc-800/60 bg-[#0A0A0A] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        {/* Project index — top-left of card */}
        <span className="absolute top-6 left-6 z-20 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
          {project.index} / 03
        </span>

        {/* FEATURED-style badge — top-right of card */}
        <span className="absolute top-6 right-6 z-20 rounded-md border border-zinc-700 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-200">
          {project.badge}
        </span>

        {/* Mockup area (left ~55%) */}
        <div className="relative bg-[#080808] border-b lg:border-b-0 lg:border-r border-zinc-900/80 p-6">
          <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#0F0F0F] border border-zinc-900/80">
            {/* fake browser chrome */}
            <div className="h-9 flex items-center gap-2 px-4 border-b border-zinc-900 bg-black/40">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-3 h-5 flex-1 max-w-[420px] rounded bg-zinc-900/60" />
            </div>
            {/* placeholder body */}
            <div className="absolute inset-0 top-9 flex flex-col items-center justify-center gap-3 text-zinc-700">
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">
                {project.title}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-800">
                Mockup placeholder
              </span>
            </div>
          </div>
        </div>

        {/* Details (right ~45%) */}
        <div className="flex flex-col justify-center p-10 xl:p-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
            {project.overline}
          </span>
          <h3 className="mt-3 text-3xl xl:text-5xl font-bold uppercase tracking-tight leading-[1] text-white">
            {project.title}
          </h3>
          <p className="mt-4 text-sm xl:text-base text-zinc-400 leading-relaxed">
            {project.description}
          </p>

          <ul className="mt-6 space-y-3">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-xs xl:text-sm text-zinc-300 leading-relaxed">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15">
                  <Check className="h-2.5 w-2.5 text-emerald-400" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techTags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200 cursor-pointer">
              Live Demo <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-zinc-900 cursor-pointer">
              <Code2 size={14} /> Source
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

type Props = {
  /** Counter-translate value (vw) so the header stays pinned at viewport's left despite section translation. */
  headerX?: MotionValue<string>;
  /** Fade-in/out tied to the PROJECTS scroll range. */
  headerOpacity?: MotionValue<number>;
};

export function Projects({ headerX, headerOpacity }: Props) {
  return (
    <section className="relative h-full w-full text-white">
      {/* Pinned header — counter-translated by parent's scroll progress. */}
      <motion.header
        className="pointer-events-none absolute left-12 top-12 z-20 flex flex-col"
        style={{ x: headerX, opacity: headerOpacity }}
      >
        <div className="flex items-center gap-4">
          {/* Big outlined "03" */}
          <span
            className="text-7xl md:text-8xl font-black tracking-tighter text-transparent leading-none select-none"
            style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)" }}
          >
            03
          </span>
          {/* PROJECTS pill */}
          <span className="rounded-md bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-black">
            Projects
          </span>
        </div>
        <h3 className="mt-4 text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tighter text-white">
          Selected Work
        </h3>
        <p className="mt-3 max-w-md text-sm md:text-base text-zinc-400">
          Real-world platforms and developer tools, shipped to production.
        </p>
      </motion.header>

      {/* 3 horizontally-laid project cards (each 100vw). Total = 300vw, matching the section width. */}
      <motion.div
        className="flex h-full w-full"
        style={{ opacity: headerOpacity }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </motion.div>
    </section>
  );
}
