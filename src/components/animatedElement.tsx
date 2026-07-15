import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Direções disponíveis: 'left', 'right', 'top', 'bottom'
import type { ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedElement({
  children,
  direction = "left",
  delay = 0,
  duration = 800,
  className = "",
  onClick = () => {},
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mapeia direções para propriedades de transformação
  const getTransformValue = () => {
    // Com reduced-motion, mantém só o fade (sem deslocamento).
    if (!isVisible && !shouldReduceMotion) {
      switch (direction) {
        case "left":
          return "translateX(-100px)";
        case "right":
          return "translateX(100px)";
        case "top":
          return "translateY(-100px)";
        case "bottom":
          return "translateY(100px)";
        default:
          return "translateX(-100px)";
      }
    }
    return "translate(0)";
  };

  useEffect(() => {
    const node = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransformValue(),
    transition: `opacity ${duration}ms, transform ${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={animationStyle}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
