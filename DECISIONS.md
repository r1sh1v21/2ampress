# Decisions — 2 AM Press storefront

Taste-driven calls made while building, plus how to run the project.

## How to run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Node 18.18+ (built and tested on Node 25). No env vars, no backend, no keys —
everything is local/mocked.

## Fonts (committed choice)

`next/font/google` self-hosts these at build time (no runtime requests to
Google), satisfying the "self-host via next/font" requirement.

- **Display:** Instrument Serif — high-contrast literary serif. Chosen over a
  heavy grotesque because the brand voice is intimate and editorial ("a letter
  at 2am"), and it scales to huge hero sizes without feeling like a tech
  landing page. Italic is used for the single rose-accent word in headings.
- **Body:** DM Sans — clean, warm sans, 17px / 1.7 line-height.
- **Mono:** JetBrains Mono — kickers, timestamps, "02:00", page numbers, the
  `№ 03` counters. Reinforces the "2 AM clock" idea.

## Styling

- **Tailwind v4** (what `create-next-app` ships). v4 is CSS-first, so the
  "Last Call" tokens live in `@theme` inside `app/globals.css` rather than a
  `tailwind.config.js`. Same outcome — `bg-ink`, `text-bone`, `border-plum`,
  `text-rose` all work as utilities. Noted because the brief said
  "tailwind.config"; v4 simply doesn't use one by default.
- **Palette is closed.** Only ink / ink-soft / plum / plum-soft / rose / bone.
  No gradients outside the ink↔plum family. Rose appears only as tiny accents:
  one word in headings, the cart badge, active nav underline, the reader's
  "saved" state and active dot — kept well under ~5% area per screen.
- **Dark only.** No light mode by design — the brand lives at night.

## Motion

- **Framer Motion** ships today as the `motion` package; imports are
  `motion/react`. Same library the brief calls "Framer Motion".
- **Lenis** drives smooth scroll (`components/SmoothScroll.tsx`), with its RAF
  loop owned by the component and torn down on unmount.
- `prefers-reduced-motion` is respected everywhere: Lenis is skipped entirely,
  the floating book holds still, scroll-linked reveals fall back to plain
  renders, and a global CSS rule clamps animation/transition durations.

## The floating book

Faux-3D, not a real 3D model: a CSS `preserve-3d` object built from layered
divs — front cover face (drawn in CSS by `BookCover`, no image dependency), a
spine on the left, and a stack of page edges on the right. Idle float loops
forever; cursor tilt is a damped spring and is disabled for `pointerType ===
"touch"` and under reduced motion. Soft shadow beneath reacts to the float.

## The reader (`/read/[slug]`)

- One entry per screen, page-by-page — mirrors the product philosophy. Not a
  scroll of all entries.
- Navigation: ← / → keys, on-screen prev/next, swipe (motion drag with an
  offset threshold). Transition is a depth-tinted horizontal slide via
  `AnimatePresence` with a direction `custom`.
- Progress is a **thin SVG arc** + a `01 / 10` mono counter, not a bar.
- Delightful features, all working: "dim the lights" focus mode (also `F`),
  adjustable text size (persisted), a `★ save` bookmark persisted per-book in
  `localStorage`, and an ambient-sound toggle. The audio element points at
  `/public/ambient.mp3` (a placeholder that may not exist) and **fails
  silently** — the UI never lies about whether sound is playing.

## Data / scope

- Catalog (`lib/books.ts`) and reader content (`lib/reader.ts`) are local TS.
  Covers are CSS-drawn, so nothing depends on a file in `/public`.
- Cart is React Context + `localStorage` (`components/CartContext.tsx`).
  Checkout is intentionally disabled with a visible "payments aren't wired"
  note. No payment code, no account creation (left room, not built).
- `generateStaticParams` pre-renders book pages for all titles; `/read/*` only
  has content for the flagship, so other read routes 404 by design (their
  "Read a sample" links are hidden when there's no reader content).

## Assumptions

- The flagship's reader has 10 entries (5 from the brief + 5 written in the
  same voice) — enough to page through meaningfully.
- Sibling titles are invented to fill the shelf, per the brief's examples.
- `next.config.ts` pins `turbopack.root` to this folder because a stray
  `package-lock.json` in a parent directory was confusing Next's root
  inference.
