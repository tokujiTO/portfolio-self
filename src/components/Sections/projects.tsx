import { SectionHeader } from "../sectionHeader";
import { Reveal } from "../reveal";
import { Carousel } from "../carousel";
import { Card } from "../card";
import { EdgeFog } from "../edgeFog";
import { useLanguage } from "../../context/languageContext";
import projectsData from "../../data/projects.json";
import type { Project } from "../../types/content";

const PROJECTS = projectsData as Project[];

export function Projects() {
  const { language } = useLanguage();

  return (
    <section id="projetos" className="relative section-pad">
      <EdgeFog />
      <SectionHeader title={language === "pt" ? "Projetos" : "Work"} label="WORK" />
      <Reveal>
        <Carousel
          items={PROJECTS}
          getKey={(project) => project.id}
          ariaLabel={language === "pt" ? "Carrossel de projetos" : "Projects carousel"}
          prevLabel={language === "pt" ? "Projeto anterior" : "Previous project"}
          nextLabel={language === "pt" ? "Próximo projeto" : "Next project"}
          slideLabel={(i, total) =>
            language === "pt" ? `Projeto ${i} de ${total}` : `Slide ${i} of ${total}`
          }
          renderItem={(project) => <Card project={project} />}
        />
      </Reveal>
    </section>
  );
}
