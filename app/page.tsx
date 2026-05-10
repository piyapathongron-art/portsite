"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import TypeIt from "typeit-react";
import { TechStack } from "@/components/features/TechStack";
import { Projects } from "@/components/features/Projects";
import { Contact } from "@/components/features/Contact";
import { FakeEditor } from "@/components/features/FakeEditor";
import { About } from "@/components/features/About";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  const containerRef = useRef(null);
  // Contact lives OUTSIDE the sticky horizontal scroller. We detect when it
  // enters the viewport so the top nav can highlight CONTACT after the user
  // scrolls past the sticky 1000vh block.
  const contactRef = useRef<HTMLDivElement | null>(null);
  const contactInView = useInView(contactRef, { margin: "-40% 0px" });

  // Subtle Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 30, stiffness: 100, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-3, 3]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations based on scroll
  // Shorter distance (180vh), so we use tighter ranges
  const loaderOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [1, 0, 0]);
  const loaderScale = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.5, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.5, 1], [30, 0, 0]);

  const gOutlineX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const gOutlineY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  // Row layout: hero(100) + spacer(30) + tech(220) + spacer(30) + projects(300) = 680vw.
  // Total horizontal shift = 580vw. End translate = -580/680 = -85.294%.
  //
  // Piecewise mapping gives Projects more scroll budget per vw than Tech, so
  // dense card content reads comfortably. With container = 1000vh:
  //   Tech segment     [0.35 → 0.55]: 0.20 × 1000vh = 200vh of scroll for 280vw → 1.4 vw/vh
  //   Projects segment [0.55 → 1.00]: 0.45 × 1000vh = 450vh of scroll for 300vw → 0.67 vw/vh
  // Boundary at progress=0.55 corresponds to row_translate = -280vw (the moment
  // Projects starts entering the viewport from the right).
  const horizontalX = useTransform(
    scrollYProgress,
    [0.35, 0.55, 1],
    ["0%", "-41.18%", "-85.294%"], // -41.18% = -280/680
  );

  // Counter-translate keeps each section's header pinned at viewport-left.
  // Formula: counter_vw(p) = -section_offset - horizontalX_vw(p).
  // Because horizontalX is piecewise, each header counter is also a 3-stop ramp.
  //   Tech offset 130:    [-130, +150, +450]   (-130 - 0, -130 - -280, -130 - -580)
  //   Projects offset 380: [-380, -100, +200]
  const techHeaderX = useTransform(
    scrollYProgress,
    [0.35, 0.55, 1],
    ["-130vw", "150vw", "450vw"],
  );
  const projHeaderX = useTransform(
    scrollYProgress,
    [0.35, 0.55, 1],
    ["-380vw", "-100vw", "200vw"],
  );

  // Visibility milestones with the new piecewise mapping:
  //   p ≈ 0.371 — tech enters from right (horizontalX = -30)
  //   p ≈ 0.443 — tech fully in view    (horizontalX = -130)
  //   p = 0.55  — projects enters       (segment boundary, horizontalX = -280)
  //   p ≈ 0.655 — tech right edge exits (horizontalX = -350)
  //   p = 0.70  — projects fully in     (horizontalX = -380)
  // Crossfade between tech and projects headers happens around 0.50–0.60.
  const techHeaderOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.40, 0.45, 0.50, 0.55],
    [0, 0.8, 1, 1, 0],
  );
  const projHeaderOpacity = useTransform(
    scrollYProgress,
    [0.53, 0.60, 0.66, 0.97, 1],
    [0, 0.5, 1, 1, 0],
  );

  // Fade-up entrance per section.
  const techY = useTransform(scrollYProgress, [0.36, 0.45], ["24px", "0px"]);
  const projY = useTransform(scrollYProgress, [0.55, 0.70], ["24px", "0px"]);

  // Section navigation
  const NAV_ITEMS = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"] as const;
  const [activeSection, setActiveSection] = useState<string>("HOME");

  // Inside the sticky range, scrollYProgress drives the highlight. Once the
  // user scrolls past the sticky container into Contact, useInView takes over.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (contactInView) return;
    if (v < 0.05) setActiveSection("HOME");
    else if (v < 0.36) setActiveSection("ABOUT");
    else if (v < 0.55) setActiveSection("SKILLS");
    else setActiveSection("PROJECTS");
  });

  useEffect(() => {
    if (contactInView) setActiveSection("CONTACT");
  }, [contactInView]);

  const scrollToSection = useCallback((section: string) => {
    if (section === "CONTACT") {
      const el = contactRef.current;
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      return;
    }
    const container = containerRef.current as HTMLElement | null;
    if (!container) return;
    const totalScroll = container.scrollHeight - window.innerHeight;
    let targetProgress = 0;
    if (section === "HOME") targetProgress = 0;
    else if (section === "ABOUT") targetProgress = 0.20;
    else if (section === "SKILLS") targetProgress = 0.45;
    else if (section === "PROJECTS") targetProgress = 0.70;
    window.scrollTo({ top: container.offsetTop + totalScroll * targetProgress, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Global Navigation — fixed outside the sticky scroller so it persists into Contact */}
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-end items-start z-50">
        {/* Right Section Navigation */}
        <div className="flex items-center gap-6 md:gap-8 mt-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`relative text-[10px] md:text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer ${activeSection === item ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
            >
              {item}
              {activeSection === item && (
                <motion.span
                  layoutId="navDot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Divider */}
          <span className="hidden md:block w-px h-4 bg-zinc-300 dark:bg-zinc-700/60 shrink-0" aria-hidden />

          {/* CV Download — ghost pill, always visible */}
          <a
            href="/Piyapat_Resume_Dev.pdf"
            download="Piyapat_Resume_Dev.pdf"
            className={[
              "hidden md:inline-flex items-center gap-1.5",
              "rounded-lg border border-zinc-300 dark:border-zinc-700/60 bg-black/[0.04] dark:bg-white/[0.03] px-3.5 py-1.5",
              "text-[10px] font-semibold tracking-widest uppercase text-zinc-600 dark:text-zinc-400",
              "transition-all duration-300 ease-out",
              "hover:border-orange-500/50 hover:text-zinc-900 dark:hover:text-white hover:bg-orange-500/[0.07]",
              "hover:shadow-[0_0_16px_-4px_rgba(249,115,22,0.30)]",
            ].join(" ")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV
          </a>
          <ThemeToggle />
        </div>
      </nav>
      <div ref={containerRef} className="relative w-full h-[1000vh] bg-[var(--bg-base)]">
        {/* Sticky container that keeps the view locked while we scroll */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

          {/* The Giant Outline 'g' in Background */}
          <motion.div
            style={{
              x: gOutlineX,
              y: gOutlineY,
              perspective: 1000,
            }}
            className="absolute z-0 bottom-20 text-[60vw] md:text-[50rem] font-medium leading-none tracking-tighter flex items-center justify-center pointer-events-none"
          >
            <motion.span
              className="text-transparent bg-clip-text bg-linear-to-b from-zinc-300/25 via-zinc-200/10 dark:from-zinc-600/30 dark:via-zinc-800/10 to-transparent opacity-50"
              style={{
                x: parallaxX,
                y: parallaxY,
                rotateX,
                rotateY,
                WebkitTextStroke: "1px var(--glyph-stroke)",
                textShadow: "var(--glyph-text-shadow)"
              }}
            >
              <span className="animate-fade-up-10">

                &lt;/&gt;
              </span>
            </motion.span>
          </motion.div>

          {/* Scroll Indicator for Loader */}
          <motion.div
            style={{ opacity: loaderOpacity }}
            className="absolute z-30 bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-zinc-500 text-[10px] tracking-[0.3em] font-semibold">SCROLL</span>
            <div className="w-px h-12 bg-linear-to-b from-zinc-500 to-transparent animate-pulse"></div>
          </motion.div>


          {/* LOADING SCREEN — pointer-events-none lets scroll pass through to the sticky
               container. The FakeEditor inside is decorative (no tabs/clicks needed). */}
          <div className="relative z-30 w-full h-full animate-fade-up-20 pointer-events-none">
            <motion.div
              style={{
                opacity: loaderOpacity,
                scale: loaderScale,
              }}
              className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] items-center gap-12 w-full h-full px-20 pb-15"
            >
              {/* Left — welcome text + TypeIt */}
              <div className="flex flex-col">
                <div className="relative text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-2">
                  Bangkok, Thailand&nbsp;·&nbsp; Available Now
                </div>
                <div className="relative text-7xl md:text-10xl font-medium">
                  <span className="text-orange-400 text-4xl">I'm</span> Piyapat Hongron
                </div>
                <div className="relative text-4xl md:text-6xl font-medium mt-5">
                  <span className="text-4xl font-extralight">A</span>{" "}
                  <TypeIt
                    options={{
                      speed: 80,
                      waitUntilVisible: false,
                      html: true,
                      loop: true,
                    }}
                    getBeforeInit={(instance) => {
                      instance
                        .type("<span class='text-orange-400'>Full-Stack</span> Developer")
                        .pause(2500)
                        .delete(20)
                        .pause(400)
                        .type("<span class='text-orange-400'>Product</span> Builder")
                        .pause(2500)
                        .delete(15)
                        .pause(400)
                        .type("<span class='text-orange-400'>Next.js</span> Specialist")
                        .pause(2500)
                        .delete(18);
                      return instance;
                    }}
                  />
                </div>
              </div>

              {/* Right — arty.ts editor, starts immediately (hero is always visible) */}
              <div className="max-h-[300px] overflow-hidden lg:max-h-none lg:overflow-visible">
                <FakeEditor file="arty.ts" waitUntilVisible={false} startDelay={200} />
              </div>
            </motion.div>
          </div>


          {/* Horizontal Sliding Wrapper */}
          <motion.div
            style={{ x: horizontalX }}
            className="absolute inset-0 z-20 w-[680vw] h-full flex"
          >
            {/* SECTION 1: Main Banner (100vw) */}
            <div className="w-screen h-full shrink-0 relative">
              <motion.div
                style={{
                  opacity: contentOpacity,
                  y: contentY,
                  pointerEvents: useTransform(scrollYProgress, v => v > 0.3 ? 'auto' : 'none')
                }}
                className="w-full h-full"
              >
                <About />
              </motion.div>
            </div>

            {/* TRANSITION SPACER (30vw) — scroll room for the Skills fade-up entrance */}
            <div aria-hidden className="w-[30vw] h-full shrink-0" />

            {/* SECTION 2: Tech Stack (220vw) — wide canvas for horizontal-flowing bento */}
            <motion.div
              className="w-[220vw] h-full shrink-0 relative"
              style={{ y: techY }}
            >
              <TechStack headerX={techHeaderX} headerOpacity={techHeaderOpacity} />
            </motion.div>

            {/* TRANSITION SPACER (30vw) — scroll room for the Projects fade-up entrance */}
            <div aria-hidden className="w-[30vw] h-full shrink-0" />

            {/* SECTION 3: Projects (300vw) — 3 viewport-wide project slides */}
            <motion.div
              className="w-[300vw] h-full shrink-0 relative"
              style={{ y: projY }}
            >
              <Projects headerX={projHeaderX} headerOpacity={projHeaderOpacity} />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* CONTACT — lives OUTSIDE the sticky horizontal scroller so it scrolls
        normally (vertically) once the user reaches the end of the sticky range. */}
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
}
