import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import type { RefObject } from "react";

/**
 * Ports the prototype's [data-parallax][data-speed] behavior (translateY(scrollY * speed))
 * to a modern scroll-progress binding. Bound directly to scroll progress (no spring) so the
 * transform tracks the scroll 1:1 — composited, cheap, and never lags behind the scroll
 * (a spring here made the page feel "stuck"). Negative distance moves opposite the scroll
 * direction (e.g. the sun), positive trails it (e.g. the hero title).
 */
export function useParallax(distance: number): {
  ref: RefObject<HTMLDivElement | null>;
  y: import("motion/react").MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, distance],
  );

  return { ref, y };
}
