import { motion } from "motion/react";
import type { Project } from "../types/content";
import { useLanguage } from "../context/languageContext";

interface CardProps {
  project: Project;
}

const cardClassName =
  "block h-full overflow-hidden rounded-[18px] border transition-shadow duration-[400ms]";

const cardStyle = {
  borderColor: "var(--cardbd)",
  background: "var(--card)",
  boxShadow: "var(--glow)",
} as const;

export function Card({ project }: CardProps) {
  const { t } = useLanguage();

  // No project photos — each card keeps a distinct identity via a top accent
  // stripe in its own gradient instead of an image placeholder.
  const cover = <div className="h-[6px] w-full" style={{ background: project.gradient }} />;

  const body = (
    <div className="p-[18px]">
      <div
        className="mono font-bold"
        style={{ fontSize: "9px", color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase" }}
      >
        {t(project.category)}
      </div>
      <h3
        className="font-dm font-bold"
        style={{ fontSize: "19px", color: "var(--ink)", margin: "6px 0 8px" }}
      >
        {project.title}
      </h3>
      <p
        className="font-dm m-0"
        style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--muted)" }}
      >
        {t(project.description)}
      </p>
    </div>
  );

  if (project.href) {
    return (
      <motion.a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={cardClassName}
        style={cardStyle}
      >
        {cover}
        {body}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cardClassName}
      style={cardStyle}
    >
      {cover}
      {body}
    </motion.div>
  );
}
