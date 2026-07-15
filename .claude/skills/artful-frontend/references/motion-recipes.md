# Motion recipes (`motion/react`, this project)

Copy-adapt these. They assume React 19, Tailwind v4 arbitrary-value tokens
(`bg-(--color-card)`), and the project spring feel
`{ stiffness: 140, damping: 18, mass: 0.2 }`. Always gate large motion behind
`useReducedMotion()`.

## Shared spring config

```ts
export const SPRING = { stiffness: 140, damping: 18, mass: 0.2 } as const;
// snappier tap feedback
export const SPRING_SNAP = { stiffness: 400, damping: 30 } as const;
```

## 1. Scroll-reveal with `motion` (native alternative to AnimatedElement)

Use when you want variants/stagger rather than the plain IntersectionObserver
component.

```tsx
import { motion, useReducedMotion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", ...SPRING } },
};

export function RevealList({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col gap-3"
    >
      {items.map((label) => (
        <motion.li
          key={label}
          variants={reduce ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : item}
          className="rounded-2xl border border-(--color-border-soft) bg-(--color-card) p-4 text-(--color-text-primary)"
        >
          {label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## 2. Word-by-word headline assembly

Editorial hero type that arrives one word at a time.

```tsx
function AssembleHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.h1
      className="text-[clamp(2.5rem,9vw,7rem)] font-bold italic leading-none text-(--color-text-secondary)"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.06 }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : "0.4em", rotate: reduce ? 0 : -4 },
            show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", ...SPRING } },
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

## 3. Card that lifts + tilts toward the pointer

Per-card 3D tilt. Cheap: only `rotateX/rotateY/translate` + a token-driven glow.

```tsx
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

export function TiltCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const rotateY = useTransform(sx, [-1, 1], [-8, 8]);
  const rotateX = useTransform(sy, [-1, 1], [8, -8]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => { px.set(0); py.set(0); }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", ...SPRING }}
      className="rounded-2xl border border-(--color-border-soft) bg-(--color-card) p-6 text-(--color-text-primary) shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)]"
    >
      {children}
    </motion.div>
  );
}
```

## 4. Scroll-linked section (parallax / progress), matching the hero

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}
```

## 5. Shared-layout / animated presence (tabs, filters, modals)

The tech-filter buttons in `App.tsx` are a natural fit for a sliding pill.

```tsx
import { motion, AnimatePresence } from "motion/react";

// sliding active indicator across tabs
{tabs.map((t) => (
  <button key={t} onClick={() => setActive(t)} className="relative px-4 py-2">
    {active === t && (
      <motion.span
        layoutId="active-pill"
        className="absolute inset-0 rounded-full bg-(--color-card)"
        transition={{ type: "spring", ...SPRING }}
      />
    )}
    <span className="relative z-10">{t}</span>
  </button>
))}

// enter/exit for a panel
<AnimatePresence mode="wait">
  {open && (
    <motion.div
      key="panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ type: "spring", ...SPRING }}
    />
  )}
</AnimatePresence>
```

## 6. Pointer-follow glow / spotlight (token-safe)

Ambient cursor light using `useMotionTemplate`, like the hero's background pos.

```tsx
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

const mx = useMotionValue(0);
const my = useMotionValue(0);
const bg = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, var(--color-surface), transparent 70%)`;

<motion.div
  onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }}
  style={{ background: bg }}
  className="rounded-3xl border border-(--color-border-soft) p-8"
/>
```

## Gotchas

- Import from `motion/react`, **not** `framer-motion`.
- `whileInView` + `viewport={{ once: true }}` for reveals so they don't replay.
- Don't spring layout-affecting size; use `scale` + `layout`.
- Add a token to **both** `:root` and `[data-theme="light"]` in `index.css`
  before using it.
- Wrap continuous-transform containers in `overflow-hidden`.
