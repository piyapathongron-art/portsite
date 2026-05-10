"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { FakeEditor } from "@/components/features/FakeEditor";

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
      className="relative w-full min-h-screen bg-[var(--bg-base)] px-8 md:px-16 py-24 flex items-center overflow-hidden"
    >
      {/* Faint background glyph echo from the hero (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 select-none text-[40rem] font-medium leading-none tracking-tighter text-zinc-200/50 dark:text-zinc-900/40"
        style={{ WebkitTextStroke: "1px var(--watermark-stroke)" }}
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
          <span
            className="text-7xl md:text-8xl font-black tracking-tighter text-transparent leading-none select-none"
            style={{ WebkitTextStroke: "1.5px var(--section-stroke)" }}
          >
            04
          </span>
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex w-fit items-center rounded-full border border-orange-500/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-500 md:text-xs"
          >
            Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-5xl font-black uppercase leading-[0.92] tracking-tighter md:text-7xl xl:text-8xl text-zinc-900 dark:text-white"
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
            className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg"
          >
            Whether it&apos;s a freelance build or a full-time opportunity —{" "}
            let&apos;s talk. I respond within 24 hours.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="mailto:piyapathongron@gmail.com"
              className="group inline-flex items-center gap-3 rounded-lg bg-zinc-900 dark:bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white dark:text-black transition hover:bg-zinc-800 dark:hover:bg-zinc-200 md:text-sm"
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

          {/* Social links — LinkedIn + GitHub, visible for HR quick-scan */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-5"
          >
            <a
              href="https://www.linkedin.com/in/piyapathongron/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:hover:text-white"
            >
              {/* LinkedIn */}
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="transition-colors duration-200 group-hover:text-[#0A66C2]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <span className="text-zinc-400 dark:text-zinc-800" aria-hidden>·</span>
            <a
              href="https://github.com/piyapathongron-art"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:hover:text-white"
            >
              {/* GitHub */}
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — fake VS Code editor (contact.tsx only) */}
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
          <FakeEditor file="contact.tsx" />
        </motion.div>
      </div>
    </section>
  );
}
