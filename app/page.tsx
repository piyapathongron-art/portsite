"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useInView } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import TypeIt from "typeit-react";
import { TechStack } from "@/components/features/TechStack";
import { Projects } from "@/components/features/Projects";
import { Contact } from "@/components/features/Contact";
import { FakeEditor } from "@/components/features/FakeEditor";

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
      <div ref={containerRef} className="relative w-full h-[1000vh] bg-[#030303] text-white ">
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
              className="text-transparent bg-clip-text bg-linear-to-b from-zinc-600/30 via-zinc-800/10 to-transparent opacity-50"
              style={{
                x: parallaxX,
                y: parallaxY,
                rotateX,
                rotateY,
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                textShadow: "0px -1px 1px rgba(255, 255, 255, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.8), 0px 15px 30px rgba(0, 0, 0, 0.9), 0px 30px 60px rgba(249, 115, 22, 0.08)"
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
                <div className="relative text-2xl md:text-4xl font-thin">
                  Welcome to my Canvas
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
                        .pause(500)
                        .type("<span class='text-orange-400'>Creative</span> Architect")
                        .pause(2500)
                        .delete(18)
                        .pause(500)
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

          {/* Fixed Top Navigation */}
          <nav className="absolute top-0 w-full p-6 md:p-10 flex justify-end items-start z-50">
            {/* Left Social Links */}
            {/* <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs font-semibold tracking-widest text-zinc-400 mt-2">
            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
              <FaFacebookF className="text-[12px] md:text-[14px]" /> FB
            </span>
            <span className="text-orange-500 flex items-center">•</span>
            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
              <FaGithub className="text-[12px] md:text-[14px]" /> GH
            </span>
            <span className="text-orange-500 flex items-center">•</span>
            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
              <FaLinkedinIn className="text-[12px] md:text-[14px]" /> LI
            </span>
          </div> */}

            {/* Center Logo */}
            {/* <div className="text-3xl md:text-4xl font-medium relative mr-25 md:ml-0">
            arty
            <span className="absolute top-[60%] left-[12px] w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          </div> */}

            {/* Right Section Navigation */}
            <div className="flex items-center gap-6 md:gap-8 mt-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative text-[10px] md:text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer ${activeSection === item ? "text-white" : "text-zinc-500 hover:text-zinc-300"
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
            </div>
          </nav>

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
                <div className="w-full h-full relative pointer-events-auto">

                  {/* Circular Text Top-Left */}
                  <div className="absolute top-28 left-8 md:left-12 w-24 h-24 md:w-32 md:h-32 rounded-full border border-zinc-800/50 items-center justify-center hidden sm:flex">
                    <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-500 opacity-70">
                        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                        <text fontSize="10" letterSpacing="1.5" className="fill-current">
                          <textPath href="#circlePath">
                            • Piyapat Collection • Piyapat Collection •
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    <span className="text-2xl font-serif italic text-zinc-300">a</span>
                  </div>

                  {/* Main Headlines */}
                  <div className="absolute top-[25%] left-[8%] md:left-[12%] max-w-5xl z-20 cursor-default">
                    <h1 className="text-5xl md:text-[5.5rem] font-medium tracking-tight leading-[1.1] mb-2">
                      Architecting.<span className="text-zinc-500">Scalable.Systems.</span>
                    </h1>
                    <h2 className="text-5xl md:text-[5.5rem] font-medium tracking-tight leading-[1.1] mb-2">
                      Fullstack Precision.
                    </h2>
                    <h3 className="text-5xl md:text-[5.5rem] font-medium tracking-tight leading-[1.1]">
                      Next-Level Performance.
                    </h3>
                  </div>

                  {/* Dark Grey Banner */}
                  <div className="absolute bottom-[10%] md:bottom-[20%] left-[-20%] w-[150%] h-[60px] md:h-[90px] bg-[#111] border-y border-zinc-800 text-zinc-300 rotate-[-15deg] origin-center z-20 flex items-center overflow-hidden shadow-2xl">
                    <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite_reverse] gap-8 items-center text-sm md:text-xl tracking-widest font-semibold px-4">
                      <span>CREATIVE DESIGN</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>UI/UX</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>MARKETING</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>MOTION</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>ANIMATION</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>BRNDING</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>CREATIVE DESIGN</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>UI/UX</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>MARKETING</span><span className="text-orange-500 text-[10px]">●</span>
                      <span>MOTION</span><span className="text-orange-500 text-[10px]">●</span>
                    </div>
                  </div>

                  {/* Bottom Right Video Button */}
                  <div className="absolute bottom-8 right-8 md:bottom-20 md:right-20 w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center cursor-pointer group">
                    <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-400 group-hover:text-white transition-colors">
                        <path id="videoCirclePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                        <text fontSize="11" letterSpacing="3" className="fill-current">
                          <textPath href="#videoCirclePath">
                            WATCH OUR VIDEO • WATCH OUR VIDEO •
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black z-10 transition-transform group-hover:scale-110 shadow-xl">
                      <Play size={20} className="ml-1 text-orange-500" fill="currentColor" />
                    </div>
                  </div>

                </div>
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
