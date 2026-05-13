"use client";

import { motion, type MotionValue } from "framer-motion";
import { Check, ArrowUpRight, Code2 } from "lucide-react";
import Image from "next/image";

type Project = {
  index: string;
  badge: string;
  overline: string;
  title: string;
  description: string;
  bullets: string[];
  techTags: string[];
  visualStyle?: "browser" | "mobile";
  liveDemoUrl?: string;
  sourceUrl?: string;
  sourceUrl2?: string;
  imagePath?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    badge: "FEATURED",
    overline: "PO & FULL STACK DEVELOPER",
    title: "WONGNORK",
    description: "Restaurant Discovery & Bill-Splitting Platform.",
    visualStyle: "mobile",
    bullets: [
      "Architected a robust relational database schema to handle complex, concurrent bill-splitting calculations and user-party management.",
      "Implemented low-latency, bi-directional communication to power live group chats and dynamic party status synchronizations.",
      "Seamlessly integrated Mapbox for geolocation-based restaurant tracking and Cloudinary for optimized media storage.",
    ],
    techTags: ["MYSQL", "PRISMA", "SOCKET.IO", "MAPBOX", "CLOUDINARY"],
    liveDemoUrl: "https://wongnork-frontend.vercel.app/",
    sourceUrl: "https://github.com/piyapathongron-art/wongnork_frontend",
    sourceUrl2: "https://github.com/piyapathongron-art/wongnork_backend",
    imagePath: "/Wongnork.png",
    imageWidth: 1170,
    imageHeight: 2101,
  },
  {
    index: "02",
    badge: "CASE STUDY",
    overline: "FRONTEND & BACKEND DEVELOPMENT",
    title: "TARAVILLE",
    description: "Real Estate Management Dashboard.",
    bullets: [
      "Built a role-gated enterprise dashboard (Admin / Staff / User) spanning 5 modules — house inventory, CRM, task assignments, walk-in/online surveys, and image management — with Zod schemas shared across the React client and Node backend to catch request/response drift at dev time, not runtime.",
      "Implemented an audit-trail middleware that snapshots oldData and newData on every CREATE, UPDATE, and SOFT DELETE — no record is ever hard-deleted, making every mutation fully traceable and recoverable.",
    ],
    techTags: ["REACT.JS", "NODE.JS", "PRISMA", "MYSQL", "ZOD"],
    sourceUrl: "https://github.com/piyapathongron-art/Taraville-Frontend",
    sourceUrl2: "https://github.com/piyapathongron-art/Taraville",
    imagePath: "/Taraville.png",
    imageWidth: 1920,
    imageHeight: 959,
  },
  {
    index: "03",
    badge: "RECENT",
    overline: "MODERN STACK IMPLEMENTATION",
    title: "THANTHONG DAILY GOLD",
    description: "Gold Price Tracking Platform.",
    bullets: [
      "Built with Next.js App Router + TypeScript for type-safe SSR; managed live gold price state across 8+ components using Zustand — eliminating prop-drilling entirely.",
      "Leveraged highly efficient global state management, seamlessly syncing live gold prices and promotional data across interactive UI components and sliders.",
    ],
    techTags: ["NEXT.JS", "TYPESCRIPT", "ZUSTAND"],
    liveDemoUrl: "https://than-thong-daily-gold.vercel.app/",
    sourceUrl: "https://github.com/piyapathongron-art/ThanThongDailyGold",
    imagePath: "/ThanThong.png",
    imageWidth: 3024,
    imageHeight: 1650,
  },
];

function MobileMockup({ title, imagePath, imageWidth, imageHeight }: {
  title: string;
  imagePath?: string;
  imageWidth?: number;
  imageHeight?: number;
}) {
  const w = imageWidth ?? 1170;
  const h = imageHeight ?? 2101;

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-transparent" />

      {/* Phone wrapper: height = 100% of parent, width auto-sized by aspect-ratio of the image */}
      <div
        className="relative h-full max-h-full"
        style={{ aspectRatio: `${w} / ${h}` }}
      >
        {/* Metal frame */}
        <div className="absolute inset-0 rounded-[3.5rem] bg-zinc-300 dark:bg-zinc-800 shadow-[0_0_80px_-20px_rgba(249,115,22,0.22)] border border-zinc-200 dark:border-zinc-700/50">

          {/* Hardware Buttons — positions as % of frame height */}
          <div className="absolute -left-[2px] w-[2px] h-[5%] bg-zinc-400 dark:bg-zinc-600 rounded-l-sm" style={{ top: "18%" }} />
          <div className="absolute -left-[2px] w-[2px] h-[8%] bg-zinc-400 dark:bg-zinc-600 rounded-l-sm" style={{ top: "27%" }} />
          <div className="absolute -left-[2px] w-[2px] h-[8%] bg-zinc-400 dark:bg-zinc-600 rounded-l-sm" style={{ top: "39%" }} />
          <div className="absolute -right-[2px] w-[2px] h-[10%] bg-zinc-400 dark:bg-zinc-600 rounded-r-sm" style={{ top: "30%" }} />

          {/* Black Bezel */}
          <div className="absolute inset-[3px] rounded-[3.3rem] bg-black p-[8px]">
            {/* Screen — fills bezel exactly, same aspect ratio as image → no crop, no distort */}
            <div className="relative h-full w-full rounded-[2.8rem] overflow-hidden bg-zinc-900">
              {imagePath ? (
                <Image src={imagePath} alt={title} fill className="object-cover" />
              ) : (
                <span
                  className="absolute -bottom-2 -left-3 text-[4rem] font-black uppercase tracking-tighter leading-none select-none pointer-events-none whitespace-nowrap"
                  style={{ WebkitTextStroke: "1px var(--watermark-stroke)", color: "transparent" }}
                >
                  {title}
                </span>
              )}
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none z-10" />

              {/* Dynamic Island */}
              <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[38%] h-[3.5%] rounded-full bg-black z-20 flex items-center justify-end px-2.5 border border-white/5 shadow-sm">
                <div className="w-[12%] aspect-square rounded-full bg-[#0a0a0a] border border-white/5" />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2 w-[35%] h-[0.6%] min-h-[4px] rounded-full bg-white/40 mix-blend-screen z-20" />
            </div>
          </div>
        </div>
      </div>

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-400 dark:text-zinc-700">
        Mobile First
      </span>
    </div>
  );
}


function BrowserMockup({ title, liveDemoUrl, imagePath, imageWidth, imageHeight }: {
  title: string;
  liveDemoUrl?: string;
  imagePath?: string;
  imageWidth?: number;
  imageHeight?: number;
}) {
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[var(--bg-elevated)] border border-zinc-100 dark:border-zinc-900/80">
      {/* browser chrome */}
      <div className="h-9 flex items-center gap-2 px-4 border-b border-zinc-200/60 dark:border-zinc-900 bg-[var(--bg-surface)]">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
        {liveDemoUrl ? (
          <span className="ml-3 h-5 flex-1 max-w-[420px] rounded bg-zinc-200/60 dark:bg-zinc-900/60 flex items-center px-2.5 overflow-hidden">
            <span className="text-[9px] text-zinc-500 truncate">
              {liveDemoUrl.replace("https://", "")}
            </span>
          </span>
        ) : (
          <span className="ml-3 h-5 flex-1 max-w-[420px] rounded bg-zinc-200/60 dark:bg-zinc-900/60" />
        )}
      </div>
      {/* screenshot – fills container width, height auto (no crop, no distort) */}
      <div className="absolute inset-0 top-9 overflow-hidden">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={title}
            width={imageWidth ?? 1920}
            height={imageHeight ?? 959}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        ) : (
          <span
            className="absolute -bottom-4 -left-2 text-[7rem] font-black uppercase tracking-tighter leading-none select-none pointer-events-none whitespace-nowrap"
            style={{ WebkitTextStroke: "1px var(--watermark-stroke)", color: "transparent" }}
          >
            {title}
          </span>
        )}
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/6 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-screen h-full shrink-0 flex items-center justify-center px-12 pt-72 pb-12">
      <article className="relative w-full max-w-[1480px] mx-auto h-full max-h-[640px] rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-[var(--bg-surface)] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">

        {/* badge */}
        <span className="absolute top-6 right-6 z-20 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700 dark:text-zinc-200">
          {project.badge}
        </span>

        {/* Mockup area (left ~55%) */}
        <div className="relative bg-[var(--bg-muted)] border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-900/80 p-6">
          {project.visualStyle === "mobile" ? (
            <MobileMockup title={project.title} imagePath={project.imagePath} imageWidth={project.imageWidth} imageHeight={project.imageHeight} />
          ) : (
            <BrowserMockup title={project.title} liveDemoUrl={project.liveDemoUrl} imagePath={project.imagePath} imageWidth={project.imageWidth} imageHeight={project.imageHeight} />
          )}
        </div>

        {/* Details (right ~45%) */}
        <div className="flex flex-col justify-center p-6 xl:p-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
            {project.overline}
          </span>
          <h3 className="mt-3 text-3xl xl:text-5xl font-bold uppercase tracking-tight leading-none text-zinc-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-4 text-sm xl:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.description}
          </p>

          <ul className="mt-6 space-y-3">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-xs xl:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
                className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200"
              >
                Live Demo <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-800 dark:text-white transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Code2 size={14} /> {project.sourceUrl2 ? "Frontend" : "Source"}
              </a>
            )}
            {project.sourceUrl2 && (
              <a
                href={project.sourceUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-800 dark:text-white transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Code2 size={14} /> Backend
              </a>
            )}
            {!project.liveDemoUrl && !project.sourceUrl && (
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest pt-1">Private / NDA</span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

type Props = {
  headerX?: MotionValue<string>;
  headerOpacity?: MotionValue<number>;
};

export function Projects({ headerX, headerOpacity }: Props) {
  return (
    <section className="relative h-full w-full">
      <motion.header
        className="pointer-events-none absolute left-12 top-12 z-20 flex flex-col"
        style={{ x: headerX, opacity: headerOpacity }}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-7xl md:text-8xl font-black tracking-tighter text-transparent leading-none select-none"
            style={{ WebkitTextStroke: "1.5px var(--section-stroke)" }}
          >
            03
          </span>
          <span className="rounded-full border border-orange-500/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-500 md:text-xs">
            Projects
          </span>
        </div>
        <h3 className="mt-4 text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tighter text-zinc-900 dark:text-white">
          Selected Work
        </h3>
        <p className="mt-3 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          Three real platforms. Real traffic. Real constraints solved.
        </p>
      </motion.header>

      <motion.div
        className="flex h-full w-[300vw]"
        style={{ opacity: headerOpacity }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </motion.div>
    </section>
  );
}
