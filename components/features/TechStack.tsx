"use client";

import type { ComponentType, CSSProperties } from "react";
import { motion, type MotionValue } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiHtml5, SiCss, SiPython,
  SiNodedotjs, SiExpress, SiReact, SiNextdotjs, SiNestjs, SiVuedotjs, SiAngular, SiTailwindcss,
  SiSocketdotio, SiJsonwebtokens,
  SiMysql, SiPrisma, SiPostgresql, SiSupabase, SiFirebase, SiMongodb,
  SiDocker, SiVercel, SiRender, SiAxios, SiSwagger, SiPostman,
  SiFigma, SiGithub,
} from "react-icons/si";
import { Layers, Lock, Globe2, Sparkles, MousePointer2, Bot, Scissors } from "lucide-react";

type IconType = ComponentType<{ size?: number | string; className?: string }>;
type Tier = "lg" | "md" | "sm";

type Skill = {
  name: string;
  category: string;
  selfScore: number;
  marketWeight: number;
  Icon: IconType;
  color: string;
  tier: Tier;
};

// final = selfScore + marketWeight (out of 20)
//   lg → flagship core stack
//   md → final ≥ 15 with strong market signal
//   sm → basics, secondary frameworks, niche tooling
//
// Skills are grouped into 5 categories rendered as separate mini-bento grids
// in a horizontal flex row. Within each group, items are ordered so dense
// column packing scatters lg/md/sm tiers organically rather than clumping.
type SkillGroup = {
  name: string;
  rows: number;
  skills: Skill[];
};

const GROUPS: SkillGroup[] = [
  {
    name: "Languages",
    rows: 3,
    skills: [
      { name: "HTML",       category: "Language", selfScore: 10, marketWeight:  5, Icon: SiHtml5,      color: "#E34F26", tier: "sm" },
      { name: "TypeScript", category: "Language", selfScore:  8, marketWeight: 10, Icon: SiTypescript, color: "#3178C6", tier: "lg" },
      { name: "CSS",        category: "Language", selfScore: 10, marketWeight:  6, Icon: SiCss,        color: "#1572B6", tier: "sm" },
      { name: "Python",     category: "Language", selfScore:  5, marketWeight:  7, Icon: SiPython,     color: "#3776AB", tier: "sm" },
      { name: "JavaScript", category: "Language", selfScore: 10, marketWeight: 10, Icon: SiJavascript, color: "#F7DF1E", tier: "md" },
    ],
  },
  {
    name: "Frameworks",
    rows: 4,
    skills: [
      { name: "React.js",     category: "Frontend",  selfScore: 10, marketWeight: 10, Icon: SiReact,         color: "#61DAFB", tier: "lg" },
      { name: "Vue.js",       category: "Frontend",  selfScore:  5, marketWeight:  6, Icon: SiVuedotjs,      color: "#4FC08D", tier: "sm" },
      { name: "Angular",      category: "Frontend",  selfScore:  5, marketWeight:  5, Icon: SiAngular,       color: "#DD0031", tier: "sm" },
      { name: "Express.js",   category: "Backend",   selfScore: 10, marketWeight:  8, Icon: SiExpress,       color: "#FFFFFF", tier: "md" },
      { name: "Next.js",      category: "Fullstack", selfScore:  7, marketWeight: 10, Icon: SiNextdotjs,     color: "#FFFFFF", tier: "lg" },
      { name: "Nest.js",      category: "Backend",   selfScore:  5, marketWeight:  6, Icon: SiNestjs,        color: "#E0234E", tier: "sm" },
      { name: "Tailwind CSS", category: "Frontend",  selfScore: 10, marketWeight:  9, Icon: SiTailwindcss,   color: "#06B6D4", tier: "md" },
      { name: "Bcrypt",       category: "Auth",      selfScore:  8, marketWeight:  5, Icon: Lock,            color: "#A1A1AA", tier: "sm" },
      { name: "Node.js",      category: "Backend",   selfScore: 10, marketWeight: 10, Icon: SiNodedotjs,     color: "#339933", tier: "lg" },
      { name: "Zustand",      category: "State",     selfScore:  8, marketWeight:  6, Icon: Layers,          color: "#FBBF24", tier: "sm" },
      { name: "Socket.io",    category: "Realtime",  selfScore:  8, marketWeight:  6, Icon: SiSocketdotio,   color: "#FFFFFF", tier: "sm" },
      { name: "JWT",          category: "Auth",      selfScore:  8, marketWeight:  7, Icon: SiJsonwebtokens, color: "#D63AFF", tier: "sm" },
    ],
  },
  {
    name: "Database",
    rows: 3,
    skills: [
      { name: "MySQL",      category: "Database", selfScore: 10, marketWeight: 7, Icon: SiMysql,      color: "#4479A1", tier: "md" },
      { name: "Supabase",   category: "Database", selfScore:  8, marketWeight: 7, Icon: SiSupabase,   color: "#3ECF8E", tier: "sm" },
      { name: "Firebase",   category: "Database", selfScore:  6, marketWeight: 6, Icon: SiFirebase,   color: "#FFCA28", tier: "sm" },
      { name: "PostgreSQL", category: "Database", selfScore:  8, marketWeight: 9, Icon: SiPostgresql, color: "#4169E1", tier: "md" },
      { name: "Prisma",     category: "ORM",      selfScore:  8, marketWeight: 8, Icon: SiPrisma,     color: "#FFFFFF", tier: "md" },
      { name: "MongoDB",    category: "Database", selfScore:  6, marketWeight: 8, Icon: SiMongodb,    color: "#47A248", tier: "sm" },
    ],
  },
  {
    name: "DevOps",
    rows: 3,
    skills: [
      { name: "Docker",   category: "DevOps",       selfScore: 6, marketWeight: 9, Icon: SiDocker,  color: "#2496ED", tier: "md" },
      { name: "Vercel",   category: "Hosting",      selfScore: 8, marketWeight: 7, Icon: SiVercel,  color: "#FFFFFF", tier: "sm" },
      { name: "Render",   category: "Hosting",      selfScore: 8, marketWeight: 5, Icon: SiRender,  color: "#46E3B7", tier: "sm" },
      { name: "REST API", category: "Architecture", selfScore: 8, marketWeight: 9, Icon: Globe2,    color: "#A78BFA", tier: "md" },
      { name: "Axios",    category: "HTTP",         selfScore: 8, marketWeight: 7, Icon: SiAxios,   color: "#5A29E4", tier: "sm" },
      { name: "Postman",  category: "Tooling",      selfScore: 8, marketWeight: 7, Icon: SiPostman, color: "#FF6C37", tier: "md" },
      { name: "Swagger",  category: "API Docs",     selfScore: 8, marketWeight: 6, Icon: SiSwagger, color: "#85EA2D", tier: "sm" },
    ],
  },
  {
    name: "Tools",
    rows: 3,
    skills: [
      { name: "Git & GitHub", category: "DevOps",  selfScore: 10, marketWeight: 10, Icon: SiGithub,      color: "#FFFFFF", tier: "md" },
      { name: "Cursor",       category: "AI Tool", selfScore:  8, marketWeight:  8, Icon: MousePointer2, color: "#FFFFFF", tier: "sm" },
      { name: "Antigravity",  category: "AI Tool", selfScore:  8, marketWeight:  4, Icon: Sparkles,      color: "#A78BFA", tier: "sm" },
      { name: "Figma",        category: "Design",  selfScore: 10, marketWeight:  9, Icon: SiFigma,       color: "#F24E1E", tier: "md" },
      { name: "Gemini CLI",   category: "AI Tool", selfScore: 10, marketWeight:  6, Icon: Sparkles,      color: "#4285F4", tier: "sm" },
      { name: "Claude CLI",   category: "AI Tool", selfScore: 10, marketWeight:  8, Icon: Bot,           color: "#D97757", tier: "sm" },
      { name: "Stitch",       category: "Design",  selfScore: 10, marketWeight:  4, Icon: Scissors,      color: "#FFFFFF", tier: "sm" },
    ],
  },
];

const SPAN: Record<Tier, string> = {
  lg: "col-span-2 row-span-2",
  md: "col-span-2 row-span-1",
  sm: "col-span-1 row-span-1",
};

const CARD_BASE =
  "group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#101010] p-4 " +
  "transition-all duration-300 hover:border-zinc-700 hover:bg-[#151515] " +
  "hover:shadow-[0_0_40px_-12px_var(--accent)]";

function SkillCard({ skill }: { skill: Skill }) {
  const { name, category, Icon, color, tier } = skill;
  const isLg = tier === "lg";
  const isSm = tier === "sm";
  const iconSize = isLg ? 38 : isSm ? 22 : 28;

  return (
    <div
      className={`${CARD_BASE} ${SPAN[tier]} flex flex-col justify-between`}
      style={{ "--accent": color } as CSSProperties}
    >
      <Icon
        size={iconSize}
        className="relative z-10 text-zinc-400 transition-colors duration-300 group-hover:text-(--accent)"
      />

      <div className="relative z-10 mt-auto">
        <h4 className={isLg ? "text-xl font-bold tracking-tight" : "text-sm font-bold tracking-tight"}>
          {name}
        </h4>
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {category}
        </p>
      </div>

      {isLg && (
        <Icon
          size={220}
          className="pointer-events-none absolute -bottom-12 -right-12 text-zinc-700/15 transition-colors duration-300 group-hover:text-[color-mix(in_srgb,var(--accent)_15%,transparent)]"
        />
      )}

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 65%)",
        }}
      />
    </div>
  );
}

const MARQUEE_TOP = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
  "Tailwind", "PostgreSQL", "MongoDB", "Docker", "REST API", "Figma",
];
const MARQUEE_BOTTOM = [
  "Vue", "Angular", "Nest.js", "Prisma", "Supabase", "Firebase",
  "Vercel", "Render", "Axios", "Swagger", "Postman", "Git",
  "Cursor", "Claude", "Gemini",
];

// Reuses `animate-marquee` (defined as @theme token in app/globals.css → keyframe 0% → -50%).
// Content is duplicated 2× so the -50% endpoint loops seamlessly.
// `reverse` flips animation-direction for the L→R layer.
function MarqueeRow({
  items,
  reverse = false,
  durationSec,
}: {
  items: string[];
  reverse?: boolean;
  durationSec: number;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max animate-marquee items-center gap-6 pr-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-700"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((name, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap">
            {name}
            <span className="text-orange-500/30">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

type Props = {
  /** Counter-translate value (vw) so the header stays pinned at viewport's left despite section translation. */
  headerX?: MotionValue<string>;
  /** Fade-in/out tied to the SKILLS scroll range. */
  headerOpacity?: MotionValue<number>;
};

export function TechStack({ headerX, headerOpacity }: Props) {
  return (
    <section className="relative h-full w-full text-white">
      {/* Pinned header — absolute + counter-translated by parent's scroll progress.
          Sits at the top; horizontal counter-translate keeps it at viewport's left
          while the bento underneath scrolls past. */}
      <motion.header
        className="pointer-events-none absolute left-12 top-16 z-20"
        style={{ x: headerX, opacity: headerOpacity }}
      >
        <span className="mb-4 inline-block rounded-full border border-orange-500/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-500 md:text-xs">
          02 SKILLS
        </span>
        <h3 className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tighter text-white md:text-6xl">
          Technologies I Work With
        </h3>
        <p className="mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
          Across the stack — interactive frontends, scalable backend services, databases, and cloud infrastructure.
        </p>
      </motion.header>

      {/* Bento — pt clears the header band. One mini-grid per category;
          gap-x-24 visually separates the clusters along the horizontal scroll. */}
      <motion.div
        className="flex h-full items-center gap-x-24 pt-67 pb-20 pl-12 pr-12"
        style={{ opacity: headerOpacity }}
      >
        {GROUPS.map((group) => (
          <div
            key={group.name}
            className={`grid shrink-0 auto-cols-[110px] grid-flow-col-dense gap-3 ${
              group.rows === 4
                ? "grid-rows-[repeat(4,110px)]"
                : "grid-rows-[repeat(3,110px)]"
            }`}
          >
            {group.skills.map((s) => (
              <SkillCard key={s.name} skill={s} />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Subtle bottom marquee — same fade timing as the header */}
      <motion.div
        className="absolute bottom-0 left-0 z-10 flex w-full flex-col gap-1 border-t border-zinc-900/60 bg-black/40 py-3"
        style={{ opacity: headerOpacity }}
      >
        <MarqueeRow items={MARQUEE_TOP} reverse durationSec={50} />
        <MarqueeRow items={MARQUEE_BOTTOM} durationSec={60} />
      </motion.div>
    </section>
  );
}
