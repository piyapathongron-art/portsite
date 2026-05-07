"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Menu, Play } from "lucide-react";
import { useRef } from "react";
import TypeIt from "typeit-react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations based on scroll
  // Shorter distance (180vh), so we use tighter ranges
  const loaderOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0]);
  const loaderScale = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.5, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.2, 1, 1], [0, 1, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.5, 1], [30, 0, 0]);

  const gOutlineX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const gOutlineY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-[#030303] text-white ">
      {/* Sticky container that keeps the view locked while we scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* The Giant Outline 'g' in Background */}
        <motion.div
          style={{
            x: gOutlineX,
            y: gOutlineY,
          }}
          className="absolute z-0 bottom-20 text-[60vw] md:text-[50rem] font-medium leading-none tracking-tighter flex items-center justify-center"
        >
          <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-600/30 via-zinc-800/10 to-transparent opacity-50 "
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
              textShadow: "0px -1px 1px rgba(255, 255, 255, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.8), 0px 15px 30px rgba(0, 0, 0, 0.9), 0px 30px 60px rgba(249, 115, 22, 0.08)"
            }}
          >
            &lt;/&gt;
          </span>
        </motion.div>

        {/* Scroll Indicator for Loader */}
        <motion.div
          style={{ opacity: loaderOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-zinc-500 text-[10px] tracking-[0.3em] font-semibold">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse"></div>
        </motion.div>


        {/* LOADING SCREEN (Only the first letter 'g') */}
        <div className="relative w-full h-full">
          <motion.div
            style={{
              opacity: loaderOpacity,
              scale: loaderScale,
              pointerEvents: useTransform(scrollYProgress, v => v > 0.3 ? 'none' : 'none')
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

        {/* MAIN CONTENT (Banner Page) */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
              pointerEvents: useTransform(scrollYProgress, v => v > 0.3 ? 'auto' : 'none')
            }}
            className="w-full h-full"
          >
            <div className="w-full h-full relative pointer-events-auto">

              {/* Top Navigation */}
              <nav className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-start z-50">
                {/* Left Social Links */}
                <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs font-semibold tracking-widest text-zinc-400 mt-2">
                  <span className="hover:text-white cursor-pointer transition-colors">FB</span>
                  <span className="text-orange-500">•</span>
                  <span className="hover:text-white cursor-pointer transition-colors">IN</span>
                  <span className="text-orange-500">•</span>
                  <span className="hover:text-white cursor-pointer transition-colors">DR</span>
                  <span className="text-orange-500">•</span>
                  <span className="hover:text-white cursor-pointer transition-colors">BE</span>
                </div>

                {/* Center Logo */}
                <div className="text-3xl md:text-4xl font-medium tracking-tight relative -ml-12 md:ml-0">
                  arty
                  {/* Orange dot for the 'g' in logo */}
                  <span className="absolute top-[60%] left-[12px] w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </div>

                {/* Right Menu */}
                <div className="flex items-center gap-6 md:gap-12 mt-1">
                  <Search size={20} className="cursor-pointer text-zinc-400 hover:text-white transition-colors hidden md:block" />
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <span className="text-[10px] md:text-xs font-semibold tracking-widest text-zinc-400 group-hover:text-white transition-colors uppercase">Menu</span>
                    <Menu size={24} className="text-white" />
                  </div>
                </div>
              </nav>

              {/* Circular Text Top-Left */}
              <div className="absolute top-28 left-8 md:left-12 w-24 h-24 md:w-32 md:h-32 rounded-full border border-zinc-800/50 flex items-center justify-center hidden sm:flex">
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
              <div className="absolute top-[25%] left-[8%] md:left-[12%] max-w-5xl z-20">
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
              {/* Diagonal Marquee Banners */}
              {/* White Banner */}
              {/* <div className="absolute top-[5%] md:top-[15%] right-[-50%] w-[200%] h-[50px] md:h-[70px] bg-white text-black rotate-[35deg] origin-center z-30 flex items-center overflow-hidden">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] gap-8 items-center text-sm md:text-lg tracking-widest font-semibold px-4">
                  <span>MARKETING</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>MOTION</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>ANIMATION</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>BRNDING</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>MARKETING</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>MOTION</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>ANIMATION</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>BRNDING</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>MARKETING</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>MOTION</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>ANIMATION</span><span className="text-orange-500 text-[10px]">●</span>
                  <span>BRNDING</span><span className="text-orange-500 text-[10px]">●</span>
                </div>
              </div> */}

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
      </div>
    </div>
  );
}
