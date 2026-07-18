import { Reveal } from "../reveal";
import { SectionHeader } from "../sectionHeader";
import { useLanguage } from "../../context/languageContext";
import type { Localized } from "../../types/content";

interface AboutItem {
  title: Localized;
  description: Localized;
}

const ITEMS: AboutItem[] = [
  {
    title: { pt: "Desenvolvedor Full-Stack", en: "Full-Stack Developer" },
    description: {
      pt: "Web e mobile com React, TypeScript, React Native e Flutter.",
      en: "Web and mobile with React, TypeScript, React Native and Flutter.",
    },
  },
  {
    title: { pt: "Dados & Cloud", en: "Data & Cloud" },
    description: {
      pt: "Análise com Power BI e Python, automação via Microsoft Graph e fundamentos de AWS e Azure.",
      en: "Analysis with Power BI and Python, automation via Microsoft Graph, and AWS/Azure foundations.",
    },
  },
  {
    title: { pt: "Liderança & Comunidade", en: "Leadership & Community" },
    description: {
      pt: "Diretor de desenvolvimento na Dev Community Mauá, liderando equipes multiculturais com metodologias ágeis.",
      en: "Development director at Dev Community Mauá, leading multicultural teams with Agile.",
    },
  },
];

export function About() {
  const { language, t } = useLanguage();

  return (
    <section id="sobre" className="section-pad">
      <SectionHeader
        title={language === "pt" ? "Sobre Mim" : "About Me"}
        label="ABOUT"
      />
      <div className="grid gap-[22px]">
        {ITEMS.map((item, i) => (
          <Reveal
            key={item.title.pt}
            delay={i * 0.15}
            className="flex items-baseline gap-4"
          >
            <span
              className="mono w-[26px] flex-none font-bold"
              style={{ fontSize: "12px", color: "var(--accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <b
                className="font-dm font-bold"
                style={{
                  fontSize: "clamp(16px,2vw,20px)",
                  color: "var(--ink)",
                }}
              >
                {t(item.title)}
              </b>
              <div
                className="font-dm mt-1"
                style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--muted)" }}
              >
                {t(item.description)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
