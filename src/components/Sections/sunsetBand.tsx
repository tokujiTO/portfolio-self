import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Transition,
} from "motion/react";
import { useParallax } from "../../hooks/useParallax";
import { useTheme } from "../../context/themeContext";

const GRID_BG =
  "repeating-linear-gradient(90deg,rgba(94,231,255,.5) 0 1px,transparent 1px 34px)," +
  "repeating-linear-gradient(0deg,rgba(94,231,255,.4) 0 1px,transparent 1px 34px)";

const DAY_GRADIENT =
  "linear-gradient(180deg,#f6c14b 0%,#f2883f 40%,#e05a6a 74%,#8f4a8e 100%)";
const NIGHT_GRADIENT =
  "linear-gradient(180deg,#050d1c 0%,#0a1e42 38%,#0f3a63 70%,#5ee7ff 100%)";

// How far below the horizon a celestial body sits when it's the "off" one (clipped away
// by the band's overflow-hidden).
const FALL = 200;

export function SunsetBand() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const shouldReduceMotion = useReducedMotion();

  // Existing scroll parallax (shared by sun + moon).
  const { ref, y } = useParallax(-50);

  // Pointer follow: the lit body drifts toward the cursor as it moves over the band.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.4 });
  const followX = useTransform(smoothX, [-1, 1], [-80, 80]);
  const followY = useTransform(smoothY, [-1, 1], [-22, 22]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, nx)));
    pointerY.set(Math.max(-1, Math.min(1, ny)));
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Under reduced motion the day↔night swap is a quiet crossfade in place — no drop, no
  // scale bounce, no pointer follow.
  const fall = shouldReduceMotion ? 0 : FALL;
  const bodyTransition: Transition = shouldReduceMotion
    ? { duration: 0.2 }
    : { type: "spring", stiffness: 55, damping: 14, mass: 0.9 };
  const fadeTransition: Transition = {
    duration: shouldReduceMotion ? 0.2 : 0.7,
    ease: "easeInOut",
  };

  const followStyle = shouldReduceMotion
    ? undefined
    : { x: followX, y: followY };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        height: "clamp(140px,20vw,220px)",
        marginBottom: "clamp(40px,6vw,72px)",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* Sky — day and night gradients crossfade on theme change */}
      <motion.div
        className="absolute inset-0"
        style={{ background: DAY_GRADIENT }}
        initial={false}
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={fadeTransition}
      />
      <motion.div
        className="absolute inset-0"
        style={{ background: NIGHT_GRADIENT }}
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={fadeTransition}
      />

      {/* perspective floor grid — hidden in light, visible + scrolling in dark (--gridop) */}
      <div
        className="absolute right-0 bottom-0 left-0 overflow-hidden"
        style={{
          height: "70%",
          opacity: "var(--gridop)",
          transform: "perspective(300px) rotateX(70deg)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="synth-grid absolute inset-x-0 top-0"
          style={{ height: "calc(100% + 34px)", background: GRID_BG }}
        />
      </div>

      {/* SUN — right side. Up by day; falls + shrinks + fades as night arrives. */}
      <motion.div
        aria-hidden="true"
        className="absolute"
        style={{
          right: "clamp(30px,10vw,140px)",
          top: "22%",
          width: "clamp(72px,10vw,110px)",
          height: "clamp(72px,10vw,110px)",
          y,
          willChange: "transform",
        }}
      >
        <motion.div className="h-full w-full" style={followStyle}>
          <motion.div
            className="h-full w-full"
            initial={false}
            animate={{
              y: isDark ? fall : 0,
              scale: isDark ? (shouldReduceMotion ? 1 : 0.5) : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={bodyTransition}
          >
            <div className="sun-core" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* MOON — opposite (left) side. Rises + grows into view as night arrives. */}
      <motion.div
        aria-hidden="true"
        className="absolute"
        style={{
          left: "clamp(30px,10vw,140px)",
          top: "22%",
          width: "clamp(64px,9vw,96px)",
          height: "clamp(64px,9vw,96px)",
          y,
          willChange: "transform",
        }}
      >
        <motion.div className="h-full w-full" style={followStyle}>
          <motion.div
            className="h-full w-full"
            initial={false}
            animate={{
              y: isDark ? 0 : fall,
              scale: isDark ? 1 : shouldReduceMotion ? 1 : 0.4,
              opacity: isDark ? 1 : 0,
            }}
            transition={bodyTransition}
          >
            <div className="moon-core" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
