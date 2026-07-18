import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal } from "../reveal";
import { useParallax } from "../../hooks/useParallax";
import { useLanguage } from "../../context/languageContext";
import profilePhoto from "../../assets/profile.webp";

export function Hero() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { ref, y } = useParallax(36);

  // Pointer-driven parallax: the photo tilts in 3D toward the cursor while the big name
  // drifts the opposite way, giving the hero a layered sense of depth. Springs smooth it
  // out; everything zeroes under prefers-reduced-motion.
  const headerRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 18, mass: 0.3 };
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  const photoRotateY = useTransform(smoothX, [-1, 1], [-9, 9]);
  const photoRotateX = useTransform(smoothY, [-1, 1], [7, -7]);
  const photoTranslateX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const photoTranslateY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const nameTranslateX = useTransform(smoothX, [-1, 1], [14, -14]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || !headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, nx)));
    pointerY.set(Math.max(-1, Math.min(1, ny)));
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <header
      ref={headerRef}
      className="content-col"
      style={{ padding: "clamp(44px,7vw,84px) 0 clamp(28px,4vw,40px)" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <Reveal
        delay={0}
        className="mono mb-5 font-bold"
        style={{ fontSize: "10px", letterSpacing: ".28em", color: "var(--accent)" }}
      >
        {language === "pt"
          ? "DESENVOLVEDOR FULL-STACK · 01"
          : "FULL-STACK DEVELOPER · 01"}
      </Reveal>

      <Reveal delay={0.18}>
        <motion.h1
          ref={ref}
          className="text-[clamp(38px,11vw,60px)] md:text-[clamp(52px,12vw,104px)]"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-.035em",
            margin: "0 0 26px",
            color: "var(--ink)",
            textShadow: "var(--glow)",
            textWrap: "balance",
            y: shouldReduceMotion ? 0 : y,
            x: shouldReduceMotion ? 0 : nameTranslateX,
          }}
        >
          Tiago
          <br />
          Massuda<span style={{ color: "var(--accent)" }}>.</span>
        </motion.h1>
      </Reveal>

      <div className="flex flex-col gap-[clamp(18px,3vw,34px)] md:flex-row md:flex-wrap md:items-start">
        <Reveal
          delay={0.36}
          className="mx-auto w-full max-w-[340px] md:mx-0 md:w-[clamp(150px,26vw,210px)] md:max-w-none md:flex-none"
          style={{ perspective: 800 }}
        >
          <motion.div
            className="overflow-hidden rounded-[18px] shadow-[0_18px_44px_-14px_rgba(120,50,20,0.5)]"
            style={{
              aspectRatio: "4/5",
              // Gradient behind the background-removed photo (the PNG is a cut-out, so this
              // shows through the transparent areas). Theme-driven via --photobg so it fades
              // together with the rest of the page instead of staying frozen on toggle.
              background: "var(--photobg)",
              transition: "background 0.6s ease",
              transformPerspective: 800,
              rotateX: shouldReduceMotion ? 0 : photoRotateX,
              rotateY: shouldReduceMotion ? 0 : photoRotateY,
              x: shouldReduceMotion ? 0 : photoTranslateX,
              y: shouldReduceMotion ? 0 : photoTranslateY,
            }}
          >
            <img
              src={profilePhoto}
              alt={language === "pt" ? "Foto de perfil de Tiago Massuda" : "Profile photo of Tiago Massuda"}
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        </Reveal>

        <Reveal
          delay={0.54}
          className="font-dm m-0"
          style={{
            fontSize: "clamp(15px,1.7vw,19px)",
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: 440,
          }}
        >
          {language === "pt"
            ? "Estudante de Ciência da Computação no Instituto Mauá de Tecnologia e desenvolvedor full-stack com foco em React, TypeScript e Flutter. Transito também por análise de dados e cloud, unindo interfaces bem construídas a soluções que resolvem problemas reais."
            : "Computer Science student at Instituto Mauá de Tecnologia and full-stack developer focused on React, TypeScript and Flutter. I also work across data analysis and cloud, pairing well-crafted interfaces with solutions that solve real problems."}
        </Reveal>
      </div>
    </header>
  );
}
