"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import TypeIt from "typeit-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { TechStack } from "@/components/features/TechStack";

export default function Home() {
  const containerRef = useRef(null);

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

  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.5, 1], [30, 0, 0]);

  const gOutlineX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const gOutlineY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  // Row is hero(100vw) + tech(200vw) = 300vw. To slide the tech section's
  // right edge to the viewport's right edge: -200vw / 300vw = -66.67%.
  const horizontalX = useTransform(scrollYProgress, [0.35, 1], ["0%", "-66.67%"]);

  // Counter-translation for the TechStack header so it stays pinned at the
  // viewport's left edge while the section scrolls past. CSS `sticky` cannot
  // do this because the horizontal motion is a transform, not a scroll.
  // Math: header lives at section's left-8 (~8px). Section starts at row's
  // 100vw. Header world-x = row_translate + 100vw + 8. To hold world-x ≈ 8:
  //   counter_x = -100vw - row_translate
  // Row translate sweeps 0 → -200vw, so counter sweeps -100vw → +100vw.
  const techHeaderX = useTransform(scrollYProgress, [0.35, 1], ["-100vw", "100vw"]);
  const techHeaderOpacity = useTransform(scrollYProgress, [0.6, 0.675, 0.98, 1], [0, 1, 1, 0]);

  // Section navigation
  const NAV_ITEMS = ["HOME", "ABOUT", "SKILLS"] as const;
  const [activeSection, setActiveSection] = useState<string>("HOME");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.05) setActiveSection("HOME");
    else if (v < 0.50) setActiveSection("ABOUT");
    else setActiveSection("SKILLS");
  });

  const scrollToSection = useCallback((section: string) => {
    const container = containerRef.current as HTMLElement | null;
    if (!container) return;
    const totalScroll = container.scrollHeight - window.innerHeight;
    let targetProgress = 0;
    if (section === "HOME") targetProgress = 0;
    else if (section === "ABOUT") targetProgress = 0.35;
    else if (section === "SKILLS") targetProgress = 0.675;
    window.scrollTo({ top: container.offsetTop + totalScroll * targetProgress, behavior: "smooth" });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#030303] text-white ">
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


        {/* LOADING SCREEN (Only the first letter 'g') */}
        <div className="relative z-30 w-full h-full animate-fade-up-20 pointer-events-none">
          <motion.div
            style={{
              opacity: loaderOpacity,
              scale: loaderScale,
            }}
            className="flex flex-col ml-20 pb-15 justify-center w-full h-full"
          >
            <div className="relative text-2xl md:text-4xl font-thin ">
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
                  waitUntilVisible: true,
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
          className="absolute inset-0 z-20 w-[300vw] h-full flex"
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

          {/* SECTION 2: Tech Stack (200vw) — wide canvas for horizontal-flowing bento */}
          <div className="w-[200vw] h-full shrink-0 relative">
            <TechStack headerX={techHeaderX} headerOpacity={techHeaderOpacity} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
