import { useMemo, useState } from "react";
import AnimatedElement from "./components/animatedElement";
import Navbar from "./components/navbar";
import photo from "./assets/68ba2c58-eef4-40e4-81de-ada512adafcd Background Removed.png";
import AboutMe from "./components/Sections/aboutMe";
import Footer from "./components/footer";
import Card from "./components/card";
import Carousel from "./components/carousel";
import { getProjects } from "./assets/projects";
import {
  getCategoryLabel,
  getTechnologies,
  type TechnologyCategoryKey,
} from "./assets/tecnologies";
import { useLanguage } from "./context/languageContext";

type CategoryFilter = "all" | TechnologyCategoryKey;

const allLabelByLanguage = {
  pt: "Todos",
  en: "All",
};

function App() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [changing, setChanging] = useState(false);
  const projects = useMemo(() => getProjects(language), [language]);
  const technologies = useMemo(() => getTechnologies(language), [language]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(technologies.map((tech) => tech.categoryKey)),
    );

    return ["all", ...uniqueCategories] as CategoryFilter[];
  }, [technologies]);

  const filteredTechnologies = useMemo(() => {
    if (selectedCategory === "all") {
      return technologies;
    }

    return technologies.filter((tech) => tech.categoryKey === selectedCategory);
  }, [selectedCategory, technologies]);

  return (
    <div
      className="i18n-content flex min-h-screen flex-col items-center overflow-x-hidden bg-linear-to-b from-(--color-bg-main-from) to-(--color-bg-main-to) text-(--color-text-primary) transition-colors duration-300"
      style={{
        // Combinamos a textura (pontos) com o degradê de fundo
        backgroundImage: `
          radial-gradient(var(--color-text-secondary) 1px, transparent 0.8px), 
          linear-gradient(to bottom, var(--color-bg-main-from), var(--color-bg-main-to))
        `,
        backgroundSize: "32px 32px, 100% 100%",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <div className="h-20 " />
      <div className="relative flex w-full flex-col items-center px-4 pb-12 md:mb-[-24vh] z-0 sm:px-8 md:px-12 md:pb-20 lg:px-10">
        <div className="mb-4 flex flex-col items-center text-center md:hidden">
          {/* Mobile */}
          <AnimatedElement
            className="text-[clamp(2.4rem,13vw,4.5rem)]  italic font-bold text-(--color-text-secondary) leading-none"
            direction="left"
            delay={200}
          >
            Tiago
          </AnimatedElement>
          <AnimatedElement
            className="text-[clamp(2.4rem,13vw,4.5rem)] italic font-bold text-(--color-text-secondary) leading-none"
            direction="right"
            delay={350}
          >
            Massuda
          </AnimatedElement>
        </div>
        {/* >= a tablet */}
        <AnimatedElement
          className="absolute lg:left-[40%] top-[12%] hidden -translate-x-full text-[clamp(4rem,12vw,18vh)] italic font-bold text-(--color-text-secondary) md:block"
          direction="left"
          delay={200}
        >
          Tiago
        </AnimatedElement>
        <img
          src={photo}
          alt={language === "pt" ? "Perfil" : "Profile"}
          className="z-10 w-[78%] max-w-88 rounded-b-full shadow-[0_30px_5px_-16px_rgba(0,0,0,0.2)] sm:w-[62%] md:w-[48%] md:max-w-none lg:w-2/5 md:mr-40 lg:mr-50"
        />
        <AnimatedElement
          className="absolute left-1/2  top-[28%] hidden text-[clamp(4rem,12vw,18vh)] italic font-bold text-(--color-text-secondary) md:block"
          direction="right"
          delay={400}
        >
          Massuda
        </AnimatedElement>
        <AnimatedElement
          className="mt-6 flex flex-col items-center gap-1 text-(--color-text-secondary) text-center text-base italic font-bold sm:text-lg md:absolute md:left-[60%] md:top-[50%] md:mt-0 md:items-start md:text-[2.7vh]"
          direction="bottom"
        >
          <AnimatedElement className="flex" direction="bottom" delay={100}>
            {language === "pt" ? "Especialista em Cloud" : "Cloud Specialist"}
          </AnimatedElement>{" "}
          <AnimatedElement className="flex" direction="bottom" delay={200}>
            {language === "pt"
              ? "Desenvolvedor de Software"
              : "Software Developer"}
          </AnimatedElement>{" "}
          <AnimatedElement className="flex" direction="bottom" delay={300}>
            {language === "pt"
              ? "Entusiasta de Cibersegurança"
              : "Cybersecurity Enthusiast"}
          </AnimatedElement>
        </AnimatedElement>
      </div>
      <AboutMe />
      {/* <div
        id="projects"
        className="w-full flex flex-col  border-t-20 border-b-20 border-(--color-panel) border-dashed  items-center py-14  md:py-16 lg:py-20 transition-colors duration-300 bg-radial from-(--color-text-secondary) to-(--color-text-tertiary) "
      > */}
      <div
        id="projects"
        className="w-full flex flex-col  border-t-20 border-b-20 border-(--color-panel) border-double  items-center py-14  md:py-16 lg:py-20 transition-colors duration-300 bg-(--color-bg-main) "
      >
        <h1 className="mt-2 w-full text-center text-3xl text-(--color-text-secondary) font-bold sm:text-4xl">
          {language === "pt" ? "Meus Principais Projetos" : "My Main Projects"}
        </h1>
        <Carousel data={projects} />
      </div>
      <div
        id="technologies"
        className="flex w-full flex-col gap-6 bg-(--color-panel) px-4 py-14 sm:px-8 md:px-12 md:py-16 lg:px-20 lg:py-20 transition-colors duration-300"
      >
        <h1 className="mt-2 w-full text-center text-3xl text-(--color-text-secondary) font-bold sm:text-4xl">
          {language === "pt" ? "Minhas Tecnologias" : "My Technologies"}
        </h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setChanging(true);
                setTimeout(
                  () => setSelectedCategory(category),
                  filteredTechnologies.length * 30 + 100,
                );
                setTimeout(
                  () => setChanging(false),
                  filteredTechnologies.length * 30 + 150,
                );
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                selectedCategory === category
                  ? "border-transparent bg-(--color-card) text-(--color-text-primary)"
                  : "border-(--color-border-soft) bg-transparent text-(--color-text-secondary) hover:bg-(--color-surface)"
              }`}
            >
              {category === "all"
                ? allLabelByLanguage[language]
                : getCategoryLabel(language, category)}{" "}
              -{" "}
              {category === "all"
                ? technologies.length
                : technologies.filter((tech) => tech.categoryKey === category)
                    .length}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {filteredTechnologies.map((tech, index) => (
            <Card
              changing={changing}
              key={tech.skill}
              index={index}
              skill={tech.skill}
              description={tech.level}
              category={tech.category}
            />
          ))}
        </div>

        {filteredTechnologies.length === 0 && (
          <p className="text-sm text-(--color-text-secondary)">
            {language === "pt"
              ? "Nenhuma tecnologia encontrada para este filtro."
              : "No technologies found for this filter."}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
