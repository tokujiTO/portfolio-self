---
name: artful-frontend
description: >-
  Design and build expressive, dynamic UI/UX in React with the `motion` library.
  Use whenever the task is front-end craft: creating or restyling a component,
  hero, section, card, navbar, or landing page; adding animation, transitions,
  parallax, scroll-linked or gesture-driven motion, micro-interactions, hover
  states, page/enter/exit reveals; or elevating layout, typography, spacing,
  color, and visual polish. Triggers on "animation", "motion", "framer",
  "parallax", "scroll effect", "interaction", "hover", "transition", "reveal",
  "make it look better", "more dynamic", "more artistic", "UI", "UX", "design",
  "polish", "vibe". Read this BEFORE writing component or animation code.
---

# Artful Frontend

Build front-end that feels alive and intentional — motion with purpose, layout
with rhythm, and interactions that reward attention. This project is React 19 +
Vite + Tailwind v4 + `motion` (v12, imported from `motion/react`). Match its
grain, don't fight it.

## Read the room first

Before writing anything, ground the work in the codebase:

1. **Tokens, not hex.** Colors live as CSS variables in `src/index.css`
   (`--color-bg-main-from`, `--color-text-secondary`, `--color-card`,
   `--color-border-soft`, …) and are consumed via Tailwind v4 arbitrary values
   like `bg-(--color-card)` / `text-(--color-text-secondary)`. Every color you
   add must work in **both** `:root` (dark, default) and `[data-theme="light"]`.
   If a needed color doesn't exist, add the token to both blocks first.
2. **Two languages.** Copy is pt/en via `useLanguage()` — never hardcode
   user-facing strings in one language. Follow the existing
   `language === "pt" ? … : …` pattern.
3. **Existing motion vocabulary.** The hero already does pointer parallax with
   `useMotionValue` + `useSpring` + `useTransform`, scroll-linked drift with
   `useScroll`, and `useMotionTemplate` for background position. Reuse those
   primitives and their spring feel (`stiffness: 140, damping: 18, mass: 0.2`)
   so new motion feels like the same hand made it.
4. **Reveal-on-scroll** is handled by `AnimatedElement` (IntersectionObserver,
   `direction`/`delay`/`duration`). Prefer it for entrance reveals unless you
   need something `motion`-native.

## Principles for expressive UI

- **Motion must mean something.** Every animation answers "what changed / where
  did this come from / where is it going?" Decorative-only motion earns its
  place only when it sets a mood the page is deliberately going for. No motion
  for motion's sake competing with content.
- **Spring over duration.** For anything interactive or physical (drag, hover,
  pointer-follow), springs read as alive; eased `duration` reads as scripted.
  Reserve tween/`duration` for entrances and discrete state swaps.
- **Stagger to create rhythm.** Lists, grids, and word-by-word text feel
  authored when children arrive in sequence (see the `card.tsx`
  `index * 28ms` delay pattern, or `staggerChildren` in variants).
- **One focal motion per view.** Pick the single gesture that carries the
  section (the hero parallax, a card that lifts, a headline that assembles).
  Supporting elements move *less*, not equally. Contrast is the effect.
- **Depth through layered speed.** Parallax = foreground moves more than
  background. Small multiplier differences (`* 24` vs `* -16` vs `* 4`) sell
  3D without any 3D.
- **Type is the art.** Big fluid `clamp()` display type, italic weight,
  tight `leading-none`, generous negative space. The hero already leans on
  `text-[clamp(4rem,12vw,18vh)] italic font-bold` — that's the signature.
- **Restraint is the finish.** Ship one confident idea executed cleanly over
  five effects fighting each other. Cut anything that doesn't survive the
  question "does this make it clearer or more felt?"

## Non-negotiables

- **Respect `prefers-reduced-motion`.** Gate parallax/large motion behind
  `useReducedMotion()` exactly like `App.tsx` does with `isParallaxEnabled`.
  Reduced-motion users still get opacity/color feedback, just no big transforms.
- **Animate cheap properties.** `transform` (x/y/scale/rotate) and `opacity`
  only for anything continuous. Never animate `width`/`height`/`top`/`left`/
  `box-shadow` on scroll or pointer — use `layout`, `scale`, and pseudo-element
  tricks instead. Add `will-change` only on genuinely hot paths.
- **Guard the viewport.** Continuous transforms need `overflow-x-hidden` on the
  container (the root already has it) so drift doesn't spawn scrollbars.
- **Mobile is not a shrink.** Pointer parallax is desktop-only (`isWideScreen`);
  give touch its own reveal/tap feel. Test both.
- **Keep it typed and lint-clean.** `pnpm lint` and `tsc` must pass. Props get
  interfaces; motion values are typed by inference — don't `any` them.

## Workflow

1. **Name the feeling** in one line (e.g. "confident, editorial, a little
   playful on hover"). It's the tie-breaker for every later decision.
2. **Find the focal motion** — the one gesture that carries the view.
3. **Prototype the motion values** with the project's spring config, then layer
   supporting elements at lower amplitude.
4. **Wire tokens + i18n + reduced-motion** from the start, not as cleanup.
5. **Verify in the running app.** Use the `run` skill / `pnpm dev` and actually
   watch it — motion is judged by eye, not by diff. Check light + dark, mobile +
   desktop, and reduced-motion.

For concrete, copy-adaptable `motion/react` patterns tuned to this project's
tokens and spring feel, read `references/motion-recipes.md`.
