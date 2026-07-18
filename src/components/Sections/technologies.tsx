import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "../reveal";
import { useLanguage } from "../../context/languageContext";
import technologies from "../../data/technologies.json";
import type { TechCategory, Technology } from "../../types/content";

const TECHNOLOGIES = technologies as Technology[];

type FilterKey = "all" | TechCategory;

// Order of the filter pills. Labels are localized; "all" always leads.
const FILTERS: { key: FilterKey; label: { pt: string; en: string } }[] = [
  { key: "all", label: { pt: "Todas", en: "All" } },
  { key: "frontend", label: { pt: "Front-end", en: "Front-end" } },
  { key: "data", label: { pt: "Dados & BI", en: "Data & BI" } },
  { key: "backend", label: { pt: "Back-end", en: "Back-end" } },
  { key: "tools", label: { pt: "Ferramentas", en: "Tools" } },
];

export function Technologies() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState<FilterKey>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? TECHNOLOGIES
        : TECHNOLOGIES.filter((tech) => tech.category === active),
    [active],
  );

  return (
    <section id="tecnologias" className="section-pad">
      <Reveal
        className="mono mb-[18px] font-bold"
        style={{ fontSize: "10px", letterSpacing: ".24em", color: "var(--accent)" }}
      >
        {language === "pt" ? "TECNOLOGIAS · STACK" : "TECHNOLOGIES · STACK"}
      </Reveal>

      {/* Filter pills */}
      <Reveal className="mb-[22px] flex flex-wrap gap-[8px]" role="group">
        {FILTERS.map((filter) => {
          const isActive = active === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={isActive}
              className="mono cursor-pointer font-bold transition-all duration-300"
              style={{
                fontSize: "10px",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                padding: "8px 15px",
                borderRadius: "40px",
                border: "1px solid var(--chip)",
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#04121f" : "var(--muted)",
                borderColor: isActive ? "var(--accent)" : "var(--chip)",
                boxShadow: isActive ? "var(--glow)" : "none",
              }}
            >
              {filter.label[language]}
            </button>
          );
        })}
      </Reveal>

      {/* Chips — animate in/out as the filter changes */}
      <motion.ul layout className="flex list-none flex-wrap gap-[10px] p-0">
        <AnimatePresence mode="popLayout">
          {visible.map((tech) => (
            <motion.li
              key={tech.name}
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              className="mono font-bold"
              style={{
                fontSize: "12px",
                padding: "11px 20px",
                border: "1px solid var(--chip)",
                borderRadius: "40px",
                color: "var(--fg)",
                boxShadow: "var(--glow)",
              }}
            >
              {tech.name}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
