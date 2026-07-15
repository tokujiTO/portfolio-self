import { useCallback, type RefObject } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useIsWideScreen } from "./useIsWideScreen";

/** Configuração de mola padrão do projeto (o "feel" do hero). */
export const PARALLAX_SPRING = {
  stiffness: 140,
  damping: 18,
  mass: 0.2,
} as const;

type SpringConfig = {
  stiffness: number;
  damping: number;
  mass: number;
};

interface UseParallaxOptions {
  /** Elemento-alvo para o scroll-linked (`useScroll`) e, quando "element", a normalização do ponteiro. */
  target: RefObject<HTMLElement | null>;
  /** Configuração da mola; use para variar o "feel" por seção. */
  spring?: SpringConfig;
  /**
   * Origem da normalização do ponteiro:
   * - "viewport": relativo ao centro da janela (efeito de página inteira, como o hero).
   * - "element": relativo ao centro do próprio elemento (efeito por seção).
   */
  pointerSource?: "viewport" | "element";
}

interface UseParallaxResult {
  /** Parallax ativo: sem reduced-motion e em tela larga. */
  isEnabled: boolean;
  /** Tela larga (> 640px), reativo ao resize. */
  isWideScreen: boolean;
  /** Ponteiro suavizado no eixo X, em [-1, 1]. */
  springX: MotionValue<number>;
  /** Ponteiro suavizado no eixo Y, em [-1, 1]. */
  springY: MotionValue<number>;
  /** Progresso de scroll do alvo (0 → 1). */
  scrollYProgress: MotionValue<number>;
  /** Handler de `onMouseMove` do container. */
  handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  /** Handler de `onMouseLeave` do container (recentraliza). */
  handleMouseLeave: () => void;
}

/**
 * Máquina de parallax compartilhada: ponteiro normalizado + mola + progresso de
 * scroll, respeitando `prefers-reduced-motion` e tela larga. Cada consumidor
 * mantém seus próprios `useTransform` (os multiplicadores artísticos por
 * elemento); este hook centraliza apenas o encanamento e o "feel".
 */
export function useParallax({
  target,
  spring = PARALLAX_SPRING,
  pointerSource = "element",
}: UseParallaxOptions): UseParallaxResult {
  const shouldReduceMotion = useReducedMotion();
  const isWideScreen = useIsWideScreen();
  const isEnabled = !shouldReduceMotion && isWideScreen;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, spring);
  const springY = useSpring(pointerY, spring);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!isEnabled) {
        return;
      }

      let halfWidth: number;
      let halfHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (pointerSource === "element") {
        if (!target.current) {
          return;
        }
        const rect = target.current.getBoundingClientRect();
        halfWidth = rect.width / 2;
        halfHeight = rect.height / 2;
        offsetX = event.clientX - rect.left - halfWidth;
        offsetY = event.clientY - rect.top - halfHeight;
      } else {
        halfWidth = window.innerWidth / 2;
        halfHeight = window.innerHeight / 2;
        offsetX = event.clientX - halfWidth;
        offsetY = event.clientY - halfHeight;
      }

      pointerX.set(Math.max(-1, Math.min(1, offsetX / halfWidth)));
      pointerY.set(Math.max(-1, Math.min(1, offsetY / halfHeight)));
    },
    [isEnabled, pointerSource, pointerX, pointerY, target],
  );

  const handleMouseLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return {
    isEnabled,
    isWideScreen,
    springX,
    springY,
    scrollYProgress,
    handleMouseMove,
    handleMouseLeave,
  };
}
