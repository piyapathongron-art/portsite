"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full min-h-screen bg-[#030303] text-white px-8 md:px-16 py-24 flex items-center overflow-hidden"
    >
      {/* Faint background glyph echo from the hero (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 select-none text-[40rem] font-medium leading-none tracking-tighter text-zinc-900/40"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
      >
        &lt;/&gt;
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* LEFT COLUMN — text + CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col gap-7"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex w-fit items-center rounded-full border border-orange-500/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-500 md:text-xs"
          >
            04 Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-5xl font-black uppercase leading-[0.92] tracking-tighter md:text-7xl xl:text-8xl"
          >
            Let&apos;s Build
            <br />
            Something
            <br />
            <span className="text-zinc-500">Together.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            Ready to turn your idea into a product? I&apos;m just one message away.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="mailto:piyapathongron@gmail.com"
              className="group inline-flex items-center gap-3 rounded-lg bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200 md:text-sm"
            >
              Start a Conversation
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-600 md:text-xs">
              or — piyapathongron@gmail.com
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — fake VS Code editor */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          className="relative w-full"
        >
          {/* soft accent glow behind the editor */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-orange-500/10 blur-3xl"
          />

          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0A0A0A] shadow-2xl shadow-black/60">
            {/* title bar */}
            <div className="flex items-center gap-3 border-b border-zinc-900 bg-[#0F0F0F] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="ml-3 flex items-center gap-2 rounded-md bg-[#1A1A1A] px-3 py-1 text-[11px] text-zinc-400">
                <span className="text-amber-400">{"{ }"}</span>
                <span>arty.ts</span>
              </div>
            </div>

            {/* code body — VS Code Dark+ palette */}
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.75] md:p-6 md:text-[13px]">
              <code className="text-zinc-300">
                <CodeLine n={1}>
                  <Kw>const</Kw> <Var>developer</Var> <Op>=</Op>{" "}
                  <Op>{"{"}</Op>
                </CodeLine>
                <CodeLine n={2}>
                  {"  "}
                  <Prop>name</Prop>
                  <Op>:</Op> <Str>&quot;Arty (Piyapat)&quot;</Str>
                  <Op>,</Op>
                </CodeLine>
                <CodeLine n={3}>
                  {"  "}
                  <Prop>role</Prop>
                  <Op>:</Op> <Str>&quot;Full-Stack Developer&quot;</Str>
                  <Op>,</Op>
                </CodeLine>
                <CodeLine n={4}>
                  {"  "}
                  <Prop>stack</Prop>
                  <Op>:</Op> <Op>[</Op>
                  <Str>&quot;React&quot;</Str>
                  <Op>,</Op> <Str>&quot;Next.js&quot;</Str>
                  <Op>,</Op> <Str>&quot;Node.js&quot;</Str>
                  <Op>,</Op> <Str>&quot;Prisma&quot;</Str>
                  <Op>]</Op>
                  <Op>,</Op>
                </CodeLine>
                <CodeLine n={5}>
                  {"  "}
                  <Prop>passion</Prop>
                  <Op>:</Op> <Bool>true</Bool>
                  <Op>,</Op>
                </CodeLine>
                <CodeLine n={6}>
                  <Op>{"};"}</Op>
                </CodeLine>
                <CodeLine n={7}>{" "}</CodeLine>
                <CodeLine n={8}>
                  <Kw>if</Kw> <Op>(</Op>
                  <Var>you</Var>
                  <Op>.</Op>
                  <Fn>haveAnIdea</Fn>
                  <Op>())</Op> <Op>{"{"}</Op>
                </CodeLine>
                <CodeLine n={9}>
                  {"  "}
                  <Var>developer</Var>
                  <Op>.</Op>
                  <Fn>build</Fn>
                  <Op>(</Op>
                  <Var>it</Var>
                  <Op>)</Op>
                  <Op>;</Op>
                </CodeLine>
                <CodeLine n={10}>
                  <Op>{"}"}</Op>
                </CodeLine>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- syntax-highlight token components (VS Code Dark+ approximation) ---------- */

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-6 select-none text-right text-zinc-700">{n}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

const Kw = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#C586C0]">{children}</span>
);
const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#9CDCFE]">{children}</span>
);
const Prop = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#9CDCFE]">{children}</span>
);
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#CE9178]">{children}</span>
);
const Bool = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#569CD6]">{children}</span>
);
const Fn = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#DCDCAA]">{children}</span>
);
const Op = ({ children }: { children: React.ReactNode }) => (
  <span className="text-zinc-400">{children}</span>
);
