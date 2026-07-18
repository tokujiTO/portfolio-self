import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

/**
 * Ports the prototype's [data-reveal] IntersectionObserver behavior:
 * opacity 0→1, translateY(26px)→0, fires once. Timing is calmer than the prototype
 * (0.9s) so reveals breathe; pass `delay` to sequence siblings one after another.
 * Falls back to a plain visible state (opacity 1, no transform) when
 * prefers-reduced-motion is requested — content is never left hidden.
 */
export function Reveal({ children, delay = 0, duration = 0.9, ...rest }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration, ease: [0.2, 0.7, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
