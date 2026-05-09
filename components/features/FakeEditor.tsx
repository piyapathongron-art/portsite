// components/features/FakeEditor.tsx
"use client";

import TypeIt from "typeit-react";

type EditorFile = "arty.ts" | "contact.tsx";

type FakeEditorProps = {
  file: EditorFile;
  waitUntilVisible?: boolean;
  startDelay?: number;
};

const span = (color: string, s: string) =>
  `<span style="color:${color}">${s}</span>`;
const KW   = (s: string) => span("#C586C0", s);
const ID   = (s: string) => span("#9CDCFE", s);
const STR  = (s: string) => span("#CE9178", s);
const BOOL = (s: string) => span("#569CD6", s);
const FN   = (s: string) => span("#DCDCAA", s);
const OP   = (s: string) => span("#9CA3AF", s);
const TAG  = (s: string) => span("#569CD6", s);
const PUNCT = (s: string) => span("#808080", s);

const jsxOpen  = (tag: string, attrs?: string) =>
  `${PUNCT("&lt;")}${TAG(tag)}${attrs ? ` ${attrs}` : ""}${PUNCT("&gt;")}`;
const jsxClose = (tag: string) =>
  `${PUNCT("&lt;/")}${TAG(tag)}${PUNCT("&gt;")}`;
const jsxSelf  = (name: string) =>
  `${PUNCT("&lt;")}${ID(name)} ${PUNCT("/&gt;")}`;
const attr = (name: string, value: string) =>
  `${ID(name)}${OP("=")}${STR(`&quot;${value}&quot;`)}`;

const ARTY_LINES: string[] = [
  `${KW("const")} ${ID("developer")} ${OP("=")} ${OP("{")}`,
  `  ${ID("name")}${OP(":")} ${STR("&quot;Arty (Piyapat)&quot;")}${OP(",")}`,
  `  ${ID("role")}${OP(":")} ${STR("&quot;Full-Stack Developer&quot;")}${OP(",")}`,
  `  ${ID("stack")}${OP(":")} ${OP("[")}${STR("&quot;React&quot;")}${OP(",")} ${STR("&quot;Next.js&quot;")}${OP(",")} ${STR("&quot;Node.js&quot;")}${OP(",")} ${STR("&quot;Prisma&quot;")}${OP("]")}${OP(",")}`,
  `  ${ID("passion")}${OP(":")} ${BOOL("true")}${OP(",")}`,
  `${OP("};")}`,
  ``,
  `${KW("if")} ${OP("(")}${ID("you")}${OP(".")}${FN("haveAnIdea")}${OP("())")} ${OP("{")}`,
  `  ${ID("developer")}${OP(".")}${FN("build")}${OP("(")}${ID("it")}${OP(")")}${OP(";")}`,
  `${OP("}")}`,
];

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

const FILES: Record<EditorFile, string[]> = {
  "arty.ts": ARTY_LINES,
  "contact.tsx": CONTACT_LINES,
};

export function FakeEditor({
  file,
  waitUntilVisible = true,
  startDelay = 600,
}: FakeEditorProps) {
  const lines = FILES[file];

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0A0A0A] shadow-2xl shadow-black/60">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-zinc-900 bg-[#0F0F0F] px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="ml-2 text-[11px] text-zinc-500">{file}</span>
      </div>

      {/* code body */}
      <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-[1.75] md:p-6 md:text-[13px]">
        <div className="flex gap-4">
          <div className="w-6 select-none text-right text-zinc-700">
            {Array.from({ length: lines.length }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="min-w-0 flex-1 text-zinc-300">
            <TypeIt
              options={{
                speed: 15,
                startDelay,
                waitUntilVisible,
                cursorChar: "▌",
                cursorSpeed: 900,
                html: true,
                lifeLike: true,
                loop: false,
              }}
              getBeforeInit={(instance) => {
                lines.forEach((line, i) => {
                  if (line.length > 0) instance.type(line);
                  if (i < lines.length - 1) instance.break();
                });
                return instance;
              }}
            />
          </div>
        </div>
      </pre>
    </div>
  );
}
