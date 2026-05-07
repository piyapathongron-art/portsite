import { motion } from "framer-motion";
import { 
  SiJavascript, SiTypescript, SiPython, 
  SiNodedotjs, SiExpress, SiReact, SiNextdotjs, SiTailwindcss, SiSocketdotio, 
  SiMysql, SiPrisma, SiPostgresql, SiSupabase, 
  SiDocker, SiVercel, SiGit, SiFigma, SiNestjs, SiVuedotjs
} from "react-icons/si";
import { Search, Bot, Wrench, Database, Globe } from "lucide-react";

const BENTO_ITEM_CLASSES = "relative bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-between overflow-hidden group hover:bg-zinc-800/50 transition-colors duration-300";

export function TechStack() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-10 md:px-20 lg:px-32 text-white">
      <div className="mb-12">
        <h2 className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-orange-500 uppercase mb-4 border border-orange-500/30 inline-block px-4 py-1.5 rounded-full">
          02 SKILLS
        </h2>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] uppercase">
          Technologies I Work <br /> With
        </h3>
        <p className="mt-6 text-zinc-400 max-w-xl text-lg">
          Across the stack, from interactive frontends to scalable backend services, databases, and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[130px] max-w-6xl w-full">
        
        {/* React Block - Huge */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-2 row-span-2`}>
          <SiReact className="text-3xl text-zinc-500 group-hover:text-[#61DAFB] transition-colors z-10" />
          <div className="z-10 mt-auto">
            <h4 className="text-xl font-bold">React.js</h4>
            <p className="text-[10px] text-zinc-500 tracking-widest font-semibold mt-1 uppercase">Frontend</p>
          </div>
          <SiReact className="absolute -bottom-16 -right-16 text-[200px] text-zinc-800/20 group-hover:text-[#61DAFB]/10 transition-colors pointer-events-none" />
        </div>

        {/* Javascript */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-1 row-span-1`}>
          <SiJavascript className="text-2xl text-zinc-500 group-hover:text-[#F7DF1E] transition-colors z-10" />
          <div className="z-10 mt-auto">
            <h4 className="text-sm font-bold">JavaScript</h4>
            <p className="text-[9px] text-zinc-500 tracking-widest font-semibold mt-1 uppercase">Language</p>
          </div>
        </div>

        {/* Typescript */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-1 row-span-1`}>
          <SiTypescript className="text-2xl text-zinc-500 group-hover:text-[#3178C6] transition-colors z-10" />
          <div className="z-10 mt-auto">
            <h4 className="text-sm font-bold">TypeScript</h4>
            <p className="text-[9px] text-zinc-500 tracking-widest font-semibold mt-1 uppercase">Language</p>
          </div>
        </div>

        {/* Next.js - Large */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-2 row-span-2`}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
            <SiNextdotjs className="text-2xl text-black" />
          </div>
          <div className="z-10 mt-auto">
            <h4 className="text-xl font-bold">Next.js</h4>
            <p className="text-[10px] text-zinc-500 tracking-widest font-semibold mt-1 uppercase">Frontend / Fullstack</p>
          </div>
          <SiNextdotjs className="absolute -bottom-10 -right-10 text-[180px] text-zinc-800/20 group-hover:text-white/10 transition-colors pointer-events-none" />
        </div>

        {/* Node.js */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-1 row-span-1`}>
          <SiNodedotjs className="text-2xl text-zinc-500 group-hover:text-[#339933] transition-colors z-10" />
          <div className="z-10 mt-auto">
            <h4 className="text-sm font-bold">Node.js</h4>
            <p className="text-[9px] text-zinc-500 tracking-widest font-semibold mt-1 uppercase">Backend</p>
          </div>
        </div>

        {/* TailwindCSS */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-1 row-span-1`}>
          <SiTailwindcss className="text-2xl text-zinc-500 group-hover:text-[#06B6D4] transition-colors z-10" />
          <div className="z-10 mt-auto">
            <h4 className="text-sm font-bold">Tailwind CSS</h4>
            <p className="text-[9px] text-zinc-500 tracking-widest font-semibold mt-1 uppercase">Frontend</p>
          </div>
        </div>

        {/* Databases Block */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-2 row-span-1 flex-row items-center gap-6`}>
          <Database className="text-3xl text-zinc-500 group-hover:text-blue-400 transition-colors z-10" />
          <div className="z-10">
            <h4 className="text-sm font-bold">Databases</h4>
            <div className="flex gap-3 mt-2 text-zinc-500">
              <SiMysql className="hover:text-[#4479A1] cursor-pointer transition-colors text-lg" title="MySQL" />
              <SiPostgresql className="hover:text-[#4169E1] cursor-pointer transition-colors text-lg" title="PostgreSQL" />
              <SiSupabase className="hover:text-[#3ECF8E] cursor-pointer transition-colors text-lg" title="Supabase" />
              <SiPrisma className="hover:text-white cursor-pointer transition-colors text-lg" title="Prisma ORM" />
            </div>
          </div>
        </div>

        {/* APIs & DevOps Block */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-2 row-span-1 flex-row items-center gap-6`}>
          <Globe className="text-3xl text-zinc-500 group-hover:text-purple-400 transition-colors z-10" />
          <div className="z-10">
            <h4 className="text-sm font-bold">DevOps & APIs</h4>
            <div className="flex gap-3 mt-2 text-zinc-500">
              <SiDocker className="hover:text-[#2496ED] cursor-pointer transition-colors text-lg" title="Docker" />
              <SiVercel className="hover:text-white cursor-pointer transition-colors text-lg" title="Vercel" />
              <SiGit className="hover:text-[#F05032] cursor-pointer transition-colors text-lg" title="Git" />
            </div>
          </div>
        </div>

        {/* AI Tools & Dev Block */}
        <div className={`${BENTO_ITEM_CLASSES} col-span-2 row-span-1 flex-row items-center gap-6`}>
          <Bot className="text-3xl text-zinc-500 group-hover:text-green-400 transition-colors z-10" />
          <div className="z-10">
            <h4 className="text-sm font-bold">AI & Dev Tools</h4>
            <p className="text-[10px] text-zinc-400 mt-1">Cursor, Gemini, Claude, Figma</p>
          </div>
        </div>

      </div>
    </div>
  );
}
