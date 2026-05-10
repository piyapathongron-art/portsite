// components/features/FakeEditor.tsx
"use client";

import TypeIt from "typeit-react";

type EditorFile = "arty.ts" | "contact.tsx";

type FakeEditorProps = {
  file: EditorFile;
  waitUntilVisible?: boolean;
  startDelay?: number;
};

// Class-based tokens — colors flip per theme via CSS vars in globals.css.
// Using classes (not inline style="color:#xxx") so dark/light works for the
// HTML strings TypeIt streams through dangerouslySetInnerHTML.
const span = (cls: string, s: string) => `<span class="${cls}">${s}</span>`;
const KW    = (s: string) => span("tok-kw", s);
const ID    = (s: string) => span("tok-id", s);
const STR   = (s: string) => span("tok-str", s);
const BOOL  = (s: string) => span("tok-bool", s);
const FN    = (s: string) => span("tok-fn", s);
const OP    = (s: string) => span("tok-op", s);
const TAG   = (s: string) => span("tok-tag", s);
const PUNCT = (s: string) => span("tok-punct", s);
const CMT   = (s: string) => span("tok-cmt", s);

const jsxOpen = (tag: string, attrs?: string) =>
  `${PUNCT("&lt;")}${TAG(tag)}${attrs ? ` ${attrs}` : ""}${PUNCT("&gt;")}`;
const jsxClose = (tag: string) =>
  `${PUNCT("&lt;/")}${TAG(tag)}${PUNCT("&gt;")}`;
const jsxSelf = (name: string) =>
  `${PUNCT("&lt;")}${ID(name)} ${PUNCT("/&gt;")}`;
const attr = (name: string, value: string) =>
  `${ID(name)}${OP("=")}${STR(`&quot;${value}&quot;`)}`;

// Renders instantly — reader sees context before the punchline types
const ARTY_STATIC: string[] = [
  `${KW("const")} ${ID("developer")} ${OP("=")} ${OP("{")}`,
  `  ${ID("name")}${OP(":")}      ${STR("&quot;Arty (Piyapat)&quot;")}${OP(",")}`,
  `  ${ID("location")}${OP(":")}  ${STR("&quot;Bangkok, Thailand&quot;")}${OP(",")}`,
  `  ${ID("role")}${OP(":")}      ${STR("&quot;Full-Stack Developer&quot;")}${OP(",")}`,
  `  ${ID("stack")}${OP(":")}     ${OP("[")}${STR("&quot;Next.js&quot;")}${OP(",")} ${STR("&quot;Node.js&quot;")}${OP(",")} ${STR("&quot;Prisma&quot;")}${OP(",")} ${STR("&quot;TypeScript&quot;")}${OP("]")}${OP(",")}`,
  `  ${ID("available")}${OP(":")} ${BOOL("true")}${OP(",")}`,
  `${OP("};")}`,
  `${CMT("// I choose tools for reasons, not trends.")}`,
  `${CMT("// Prisma → schema-as-code. Zustand → no boilerplate.")}`,
  `${CMT("// Socket.io → only when polling won't cut it.")}`,
];

// The punchline — types out after a short pause
const ARTY_TYPED: string[] = [
  `${KW("if")} ${OP("(")}${ID("you")}${OP(".")}${FN("haveAnIdea")}${OP("())")} ${OP("{")}`,
  `  ${ID("developer")}${OP(".")}${FN("build")}${OP("(")}${ID("it")}${OP(",")} ${OP("{")} ${ID("fast")}${OP(":")} ${BOOL("true")}${OP(",")} ${ID("clean")}${OP(":")} ${BOOL("true")} ${OP("}")}${OP(")")}${OP(";")}`,
  `${OP("}")}`,
];

const CONTACT_LINES: string[] = [
  `${KW("import")} ${OP("{")} ${ID("Mail")}${OP(",")} ${ID("Github")}${OP(",")} ${ID("Linkedin")}${OP(",")} ${ID("Phone")} ${OP("}")} ${KW("from")} ${STR("&quot;lucide-react&quot;")}${OP(";")}`,
  ``,
  `${KW("export default function")} ${FN("ContactLinks")}${OP("()")} ${OP("{")}`,
  `  ${KW("return")} ${OP("(")}`,
  `    ${jsxOpen("div", attr("className", "flex flex-col gap-4"))}`,
  `      ${jsxOpen("a", attr("href", "mailto:piyapathongron@gmail.com"))}${jsxSelf("Mail")} piyapathongron@gmail.com${jsxClose("a")}`,
  `      ${jsxOpen("a", attr("href", "https://github.com/piyapathongron-art"))}${jsxSelf("Github")} @piyapathongron-art${jsxClose("a")}`,
  `      ${jsxOpen("a", attr("href", "https://linkedin.com/in/piyapathongron"))}${jsxSelf("Linkedin")} in/piyapathongron${jsxClose("a")}`,
  `      ${jsxOpen("span")}${jsxSelf("Phone")} +6693-853-3234${jsxClose("span")}`,
  `    ${jsxClose("div")}`,
  `  ${OP(")")}${OP(";")}`,
  `${OP("}")}`,
];

type FileData =
  | { type: "simple"; lines: string[] }
  | { type: "split"; static: string[]; typed: string[] };

const FILES: Record<EditorFile, FileData> = {
  "arty.ts": { type: "split", static: ARTY_STATIC, typed: ARTY_TYPED },
  "contact.tsx": { type: "simple", lines: CONTACT_LINES },
};

export function FakeEditor({
  file,
  waitUntilVisible = true,
  startDelay = 600,
}: FakeEditorProps) {
  const data = FILES[file];
  const totalLines =
    data.type === "split"
      ? data.static.length + data.typed.length
      : data.lines.length;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-(--editor-bg) shadow-xl shadow-zinc-900/10 dark:shadow-2xl dark:shadow-black/60">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-(--editor-tab-border) bg-(--editor-tab-bar) px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="ml-2 text-[11px] text-zinc-500">{file}</span>
      </div>

      {/* code body */}
      <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-[1.75] md:p-6 md:text-[13px] text-(--editor-text)">
        <div className="flex gap-4">
          {/* line numbers */}
          <div className="w-6 select-none text-right text-(--editor-line-num)">
            {Array.from({ length: totalLines }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* code content */}
          <div className="min-w-0 flex-1">
            {data.type === "split" ? (
              <>
                {data.static.map((line, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
                <TypeIt
                  options={{
                    speed: 20,
                    startDelay,
                    waitUntilVisible,
                    cursorChar: "▌",
                    cursorSpeed: 900,
                    html: true,
                    lifeLike: true,
                    loop: false,
                  }}
                  getBeforeInit={(instance) => {
                    data.typed.forEach((line, i) => {
                      if (line.length > 0) instance.type(line);
                      if (i < data.typed.length - 1) instance.break();
                    });
                    return instance;
                  }}
                />
              </>
            ) : (
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
                  data.lines.forEach((line, i) => {
                    if (line.length > 0) instance.type(line);
                    if (i < data.lines.length - 1) instance.break();
                  });
                  return instance;
                }}
              />
            )}
          </div>
        </div>
      </pre>
    </div>
  );
}
