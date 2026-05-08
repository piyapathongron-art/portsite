"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import TypeIt from "typeit-react";

/* VS Code Dark+ palette token helpers — return raw HTML so TypeIt can type
   their text content character-by-character while applying the wrapping span
   instantly (`html: true`). */
const span = (color: string, s: string) =>
  `<span style="color:${color}">${s}</span>`;
const KW = (s: string) => span("#C586C0", s); // keyword (purple)
const ID = (s: string) => span("#9CDCFE", s); // variable / property (light blue)
const STR = (s: string) => span("#CE9178", s); // string (orange)
const BOOL = (s: string) => span("#569CD6", s); // boolean keyword (blue)
const FN = (s: string) => span("#DCDCAA", s); // function (yellow)
const OP = (s: string) => span("#9CA3AF", s); // operator / punctuation (zinc-400)

const CODE_LINES: string[] = [
  `${KW("const")} ${ID("developer")} ${OP("=")} ${OP("{")}`,
  `  ${ID("name")}${OP(":")} ${STR("&quot;Arty (Piyapat)&quot;")}${OP(",")}`,
  `  ${ID("role")}${OP(":")} ${STR("&quot;Full-Stack Developer&quot;")}${OP(",")}`,
  `  ${ID("stack")}${OP(":")} ${OP("[")}${STR("&quot;React&quot;")}${OP(",")} ${STR("&quot;Next.js&quot;")}${OP(",")} ${STR("&quot;Node.js&quot;")}${OP(",")} ${STR("&quot;Prisma&quot;")}${OP("]")}${OP(",")}`,
  `  ${ID("passion")}${OP(":")} ${BOOL("true")}${OP(",")}`,
  `${OP("};")}`,
  ``, // blank line 7
  `${KW("if")} ${OP("(")}${ID("you")}${OP(".")}${FN("haveAnIdea")}${OP("())")} ${OP("{")}`,
  `  ${ID("developer")}${OP(".")}${FN("build")}${OP("(")}${ID("it")}${OP(")")}${OP(";")}`,
  `${OP("}")}`,
];

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
            className="pointer-events-none absolute -inset-6 -z-10 rounded-4xl bg-orange-500/10 blur-3xl"
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

            {/* code body — animated by TypeIt. Line numbers render statically
                on the left so they stay aligned via shared line-height; TypeIt
                streams the content into the right column. */}
            <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-[1.75] md:p-6 md:text-[13px]">
              <div className="flex gap-4">
                <div className="select-none text-right text-zinc-700">
                  {CODE_LINES.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="min-w-0 flex-1 text-zinc-300">
                  <TypeIt
                    options={{
                      speed: 40,
                      startDelay: 600,
                      cursorChar: "▌",
                      cursorSpeed: 900,
                      waitUntilVisible: true,
                      html: true,
                      lifeLike: true,
                    }}
                    getBeforeInit={(instance) => {
                      CODE_LINES.forEach((line, i) => {
                        if (line.length > 0) instance.type(line);
                        if (i < CODE_LINES.length - 1) instance.break();
                      });
                      return instance;
                    }}
                  />
                </div>
              </div>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

