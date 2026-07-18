import { Reveal } from "../reveal";
import { SectionHeader } from "../sectionHeader";
import { useLanguage } from "../../context/languageContext";
import experiences from "../../data/experiences.json";
import type { Experience } from "../../types/content";

const EXPERIENCES = experiences as Experience[];

export function Journey() {
  const { language, t } = useLanguage();

  return (
    <section id="trajetoria" className="section-pad">
      <SectionHeader
        title={language === "pt" ? "Trajetória" : "Journey"}
        label="JOURNEY"
      />
      <div className="grid gap-5">
        {EXPERIENCES.map((exp, i) => (
          <Reveal
            key={exp.id}
            delay={i * 0.15}
            className="border-l-2 py-1 pl-[18px]"
            style={{ borderColor: exp.current ? "var(--accent)" : "var(--line)" }}
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
              <b
                className="font-dm font-bold"
                style={{ fontSize: "clamp(16px,2vw,21px)", color: "var(--ink)" }}
              >
                {t(exp.role)}
              </b>
              <span
                className="mono flex-none font-bold"
                style={{
                  fontSize: "11px",
                  color: exp.current ? "var(--accent)" : "var(--faint)",
                }}
              >
                {exp.period}
              </span>
            </div>
            <div
              className="font-dm mt-[3px]"
              style={{ fontSize: "14px", color: "var(--muted)" }}
            >
              {exp.company}
            </div>
            <p
              className="font-dm mt-2 mb-0"
              style={{
                fontSize: "14px",
                lineHeight: 1.5,
                color: "var(--muted)",
                maxWidth: 560,
              }}
            >
              {t(exp.description)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
