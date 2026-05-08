"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import TypeIt from "typeit-react";

type EditorMode = "auto" | "manual";
const IDLE_RESUME_MS = 10_000;

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
const TAG = (s: string) => span("#569CD6", s); // jsx built-in tag (blue)
const PUNCT = (s: string) => span("#808080", s); // jsx <, >, /

const ARTY_LINES: string[] = [
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

// JSX helper to keep contact lines readable below.
const jsxOpen = (tag: string, attrs?: string) =>
  `${PUNCT("&lt;")}${TAG(tag)}${attrs ? ` ${attrs}` : ""}${PUNCT("&gt;")}`;
const jsxClose = (tag: string) => `${PUNCT("&lt;/")}${TAG(tag)}${PUNCT("&gt;")}`;
const jsxSelf = (name: string) =>
  `${PUNCT("&lt;")}${ID(name)} ${PUNCT("/&gt;")}`;
const attr = (name: string, value: string) =>
  `${ID(name)}${OP("=")}${STR(`&quot;${value}&quot;`)}`;

const CONTACT_LINES: string[] = [
  `${KW("import")} ${OP("{")} ${ID("Mail")}${OP(",")} ${ID("Github")}${OP(",")} ${ID("Linkedin")}${OP(",")} ${ID("Phone")} ${OP("}")} ${KW("from")} ${STR("&quot;lucide-react&quot;")}${OP(";")}`,
  ``,
  `${KW("export default function")} ${FN("ContactLinks")}${OP("()")} ${OP("{")}`,
  `  ${KW("return")} ${OP("(")}`,
  `    ${jsxOpen("div", attr("className", "flex flex-col gap-4"))}`,
  `      ${jsxOpen("a", attr("href", "mailto:mock@email.com"))}${jsxSelf("Mail")} mock@email.com${jsxClose("a")}`,
  `      ${jsxOpen("a", attr("href", "https://github.com/mock"))}${jsxSelf("Github")} @mockusername${jsxClose("a")}`,
  `      ${jsxOpen("a", attr("href", "https://linkedin.com/in/mock"))}${jsxSelf("Linkedin")} in/mockusername${jsxClose("a")}`,
  `      ${jsxOpen("span")}${jsxSelf("Phone")} +66 99 999 9999${jsxClose("span")}`,
  `    ${jsxClose("div")}`,
  `  ${OP(")")}${OP(";")}`,
  `${OP("}")}`,
];

type TabName = "arty.ts" | "contact.tsx";
const FILES: Record<TabName, string[]> = {
  "arty.ts": ARTY_LINES,
  "contact.tsx": CONTACT_LINES,
};

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  // ── Editor state ────────────────────────────────────────────────────────
  // `mode`        — "auto" loops between files; "manual" types one and stops
  // `activeTab`   — tab highlight; in auto mode it also picks the starting file
  // `version`     — bumped on every transition; used as TypeIt's `key` to force
  //                 a clean unmount/remount (typeit-react's own cleanup destroys
  //                 the underlying instance, so we never need to call .destroy()
  //                 ourselves).
  const [mode, setMode] = useState<EditorMode>("auto");
  const [activeTab, setActiveTab] = useState<TabName>("arty.ts");
  const [version, setVersion] = useState(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineCount = FILES[activeTab].length;

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  // Started in TypeIt's `afterComplete` so the 10-second window begins after
  // the user has finished reading the just-typed file (not from the click —
  // contact.tsx takes longer than 10s to type, so a click-anchored timer
  // would expire mid-stream).
  const startIdleTimer = () => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      idleTimerRef.current = null;
      setActiveTab((prev) => (prev === "arty.ts" ? "contact.tsx" : "arty.ts"));
      setMode("auto");
      setVersion((v) => v + 1);
    }, IDLE_RESUME_MS);
  };

  const handleTabClick = (tab: TabName) => {
    clearIdleTimer();
    setActiveTab(tab);
    setMode("manual");
    setVersion((v) => v + 1); // force-remount TypeIt with the manual chain
  };

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

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
            {/* title bar — macOS dots + animated file tabs */}
            <div className="flex items-center gap-3 border-b border-zinc-900 bg-[#0F0F0F] px-4 py-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="ml-3 flex items-end gap-1 text-[11px]">
                <FileTab
                  name="arty.ts"
                  icon="{ }"
                  iconColor="text-amber-400"
                  active={activeTab === "arty.ts"}
                  onClick={() => handleTabClick("arty.ts")}
                />
                <FileTab
                  name="contact.tsx"
                  icon="</>"
                  iconColor="text-sky-400"
                  active={activeTab === "contact.tsx"}
                  onClick={() => handleTabClick("contact.tsx")}
                />
              </div>
            </div>

            {/* code body — animated by TypeIt. Line numbers render statically
                on the left so they stay aligned via shared line-height; TypeIt
                streams the content into the right column. */}
            <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-[1.75] md:p-6 md:text-[13px]">
              <div className="flex gap-4">
                <div className="w-6 select-none text-right text-zinc-700">
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="min-w-0 flex-1 text-zinc-300">
                  <TypeIt
                    key={version}
                    options={{
                      speed: 15,
                      deleteSpeed: 6,
                      // Auto: wait for the editor to scroll into view + a small
                      //   start delay so it lines up with the fade-up.
                      // Manual: user just clicked, so start immediately.
                      startDelay: mode === "auto" ? 600 : 0,
                      waitUntilVisible: mode === "auto",
                      cursorChar: "▌",
                      cursorSpeed: 900,
                      html: true,
                      lifeLike: true,
                      loop: mode === "auto",
                      loopDelay: 0,
                      // Closure captures the mount-time `mode`. In auto mode
                      // afterComplete may fire between loop iterations — the
                      // `mode === "manual"` guard makes those no-ops.
                      afterComplete: () => {
                        if (mode === "manual") startIdleTimer();
                      },
                    }}
                    getBeforeInit={(instance) => {
                      const typeFile = (lines: string[]) => {
                        lines.forEach((line, i) => {
                          if (line.length > 0) instance.type(line);
                          if (i < lines.length - 1) instance.break();
                        });
                      };

                      if (mode === "manual") {
                        // Type the clicked file once and stop. afterComplete
                        // (above) starts the 10s idle timer when typing ends.
                        typeFile(FILES[activeTab]);
                      } else {
                        // Auto loop, starting from the current activeTab.
                        // `.exec(setActiveTab)` keeps the title-bar highlight
                        // synced with whichever file the queue is typing.
                        const start = activeTab;
                        const other: TabName =
                          start === "arty.ts" ? "contact.tsx" : "arty.ts";

                        instance.exec(() => setActiveTab(start));
                        typeFile(FILES[start]);
                        instance.pause(2500);
                        instance.delete();

                        instance.exec(() => setActiveTab(other));
                        typeFile(FILES[other]);
                        instance.pause(2500);
                        instance.delete();
                      }

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

function FileTab({
  name,
  icon,
  iconColor,
  active,
  onClick,
}: {
  name: string;
  icon: string;
  iconColor: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex cursor-pointer items-center gap-2 rounded-t-md px-3 py-1.5 transition-colors ${active
        ? "bg-[#1A1A1A] text-zinc-200"
        : "bg-transparent text-zinc-600 hover:bg-zinc-900/40 hover:text-zinc-400"
        }`}
    >
      <span className={active ? iconColor : "text-zinc-700"}>{icon}</span>
      <span>{name}</span>
      {/* active-tab underline accent */}
      {active && (
        <span
          aria-hidden
          className="absolute inset-x-2 -bottom-px h-px bg-orange-500/70"
        />
      )}
    </button>
  );
}

