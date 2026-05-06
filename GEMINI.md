# Portfolio

## Project Overview
A professional portfolio project built with modern web technologies.
*   **Framework:** [Next.js](https://nextjs.org/)
*   **Package Manager:** [pnpm](https://pnpm.io/)
*   **Backend/Database:** [Supabase](https://supabase.com/)

## Core Mandates

### 1. NO MAGIC — ห้ามเดา
*   All assumptions must be explicit.
*   If context is missing, state assumptions clearly.
*   Do not hallucinate hidden infrastructure or invent unspecified services.

### 2. VERIFY BEFORE DONE — ห้ามบอกว่าเสร็จถ้ายังไม่เช็ค
*   Never claim a change is complete without running verification.
*   "I edited the file" is **NOT** done.
*   "I edited the file and here is the output/test result" **IS** done.
*   No "should work now." Provide evidence before assertions, always.

### 3. SCOPE DRIFT DETECTION — จับ scope creep
*   Track stated goals vs. actual execution.
*   Flag and stop when:
    *   "Just one more thing" starts accumulating.
    *   Nice-to-haves are treated as must-haves.
    *   The task drifts from "fix bug X" to "refactoring the entire module."

### 4. R0 / R1 / R2 — ระดับความถอยกลับได้ (Change Management)
*   **R0 (Irreversible):** High impact, cannot be easily undone. **STOP.** Ask for explicit permission before proceeding.
*   **R1 (Costly to reverse):** Significant effort to undo. **Proceed**, but explicitly state *why* this path was chosen.
*   **R2 (Easily reversed):** Low risk, simple to undo. **Just do it.** No permission needed.

## Project Structure

```text
my-app/
├── app/                    ← Next.js App Router (pages + API routes)
│   ├── (auth)/             ← Route group: login, register, forgot
│   ├── (dashboard)/        ← Route group: protected pages
│   ├── api/                ← API Routes (Express-style handlers)
│   │   ├── auth/           ← JWT login / register / refresh
│   │   └── [...]/          ← RESTful resource routes
│   ├── layout.tsx
│   └── page.tsx
├── components/             ← Reusable React UI components
│   ├── ui/                 ← Base: Button, Input, Modal…
│   └── features/           ← Domain: AuthForm, UserCard…
├── lib/                    ← Core utilities & singletons
│   ├── prisma.ts           ← Prisma client singleton
│   ├── supabase.ts         ← Supabase client
│   ├── jwt.ts              ← Sign / verify JWT
│   ├── bcrypt.ts           ← Hash / compare passwords
│   └── axios.ts            ← Configured Axios instance
├── server/                 ← Express server (optional BFF)
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   ├── middleware/         ← auth, error, rate-limit
│   └── services/           ← Business logic layer
├── store/                  ← Zustand global state
│   ├── authStore.ts
│   └── uiStore.ts
├── prisma/                 ← Prisma schema + migrations
│   ├── schema.prisma
│   └── migrations/
├── types/                  ← Shared TypeScript types/interfaces
├── hooks/                  ← Custom React hooks
├── utils/                  ← Pure helper functions
├── styles/                 ← Tailwind base + global CSS
├── middleware.ts            ← Next.js Edge middleware (JWT guard)
├── .env.local
├── tailwind.config.ts
└── tsconfig.json
```

## Development Commands
*   **Install Dependencies:** `pnpm install`
*   **Development Server:** `pnpm dev`
*   **Build Project:** `pnpm build`
*   **Linting:** `pnpm lint`
*   **Database Sync:** (Add Supabase CLI commands as needed)

## Context & Conventions
*   Adhere to Next.js App Router conventions.
*   Use TypeScript for all new components and logic.
*   Prefer Supabase Auth and Database helpers for backend interactions.
