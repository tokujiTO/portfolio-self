import { useMemo, useRef, useState } from "react";
import AnimatedElement from "./components/animatedElement";
import Navbar from "./components/navbar";
import photo from "./assets/68ba2c58-eef4-40e4-81de-ada512adafcd Background Removed.png";
import AboutMe from "./components/Sections/aboutMe";
import Footer from "./components/footer";
import Card from "./components/card";
import background from "./assets/background.png";
import { motion, useMotionTemplate, useTransform } from "motion/react";
import Carousel from "./components/carousel";
import { getProjects } from "./assets/projects";
import {
  getCategoryLabel,
  getTechnologies,
  type TechnologyCategoryKey,
} from "./assets/tecnologies";
import { useLanguage } from "./context/languageContext";
import { useParallax } from "./hooks/useParallax";

type CategoryFilter = "all" | TechnologyCategoryKey;

const allLabelByLanguage = {
  pt: "Todos",
  en: "All",
};

function App() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const {
    isEnabled: isParallaxEnabled,
    isWideScreen,
    springX,
    springY,
    scrollYProgress,
    handleMouseMove,
    handleMouseLeave,
  } = useParallax({
    target: heroRef,
    spring: { stiffness: 140, damping: 18, mass: 0.2 },
    pointerSource: "viewport",
  });

  const tiagoX = useTransform(springX, (value) => value * 24);
  const tiagoY = useTransform(springY, (value) => value * 12);
  const tiagoScrollExitX = useTransform(scrollYProgress, [0.44, 1], [0, -300]);
  const massudaX = useTransform(springX, (value) => value * -26);
  const massudaY = useTransform(springY, (value) => value * 14);
  const massudaScrollExitX = useTransform(scrollYProgress, [0.46, 1], [0, 300]);
  const imageX = useTransform(springX, (value) => value * -16);
  const imageY = useTransform(springY, (value) => value * -10);
  const imageRotate = useTransform(springX, (value) => value * 2.5);

  const scrollDriftX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-0.3, 0, 0.3],
  );
  const scrollLiftY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.5, 0, -0.5],
  );

  const tiagoXScroll = useTransform(scrollDriftX, (value) => value * 30);
  const tiagoYScroll = useTransform(scrollLiftY, (value) => value * 22);
  const massudaXScroll = useTransform(scrollDriftX, (value) => value * -34);
  const massudaYScroll = useTransform(scrollLiftY, (value) => value * 24);
  const imageXScroll = useTransform(scrollDriftX, (value) => value * -20);
  const imageYScroll = useTransform(scrollLiftY, (value) => value * -28);

  const tiagoXCombined = useTransform(
    () => tiagoX.get() + tiagoXScroll.get() + tiagoScrollExitX.get(),
  );
  const tiagoYCombined = useTransform(() => tiagoY.get() + tiagoYScroll.get());

  const massudaXCombined = useTransform(
    () => massudaX.get() + massudaXScroll.get() + massudaScrollExitX.get(),
  );
  const massudaYCombined = useTransform(
    () => massudaY.get() + massudaYScroll.get(),
  );
  const imageXCombined = useTransform(() => imageX.get() + imageXScroll.get());
  const imageYCombined = useTransform(() => imageY.get() + imageYScroll.get());
  const backgroundPosX = useTransform(springX, (value) => 50 + value * 4);
  const backgroundPosY = useTransform(springY, (value) => 50 + value * 3);
  const backgroundPosition = useMotionTemplate`${backgroundPosX}% ${backgroundPosY}%`;

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
    <motion.div
      className="i18n-content flex min-h-screen flex-col items-center overflow-x-hidden bg-linear-to-b from-(--color-bg-main-from) to-(--color-bg-main-to) text-(--color-text-primary) transition-colors duration-300"
      style={{
        // background image only on large screens
        backgroundImage: isWideScreen ? `url(${background})` : undefined,
        backgroundSize: "30vw",
        backgroundPosition: isParallaxEnabled ? backgroundPosition : "50% 50%",
        backgroundRepeat: "repeat",
        imageRendering: "pixelated",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a href="#main-content" className="skip-link">
        {language === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Navbar />
      <div className="h-20 " />
      <main id="main-content" className="flex w-full flex-col items-center">
        <section
          ref={heroRef}
          aria-label={language === "pt" ? "Apresentação" : "Introduction"}
          className="relative z-0 flex w-full flex-col items-center px-4 pb-12 sm:px-8 md:mb-[-24vh] md:px-12 md:pb-20 lg:px-10"
        >
          <h1 className="sr-only">Tiago Massuda</h1>
          <motion.div
            aria-hidden="true"
            className="mb-4 flex flex-col items-center text-center md:hidden"
            style={
              isParallaxEnabled
                ? { x: tiagoXCombined, y: tiagoYCombined }
                : undefined
            }
          >
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
          </motion.div>
          {/* >= a tablet */}
          <motion.div
            aria-hidden="true"
            className="absolute top-[12%] hidden lg:left-[40%] md:block"
            style={
              isParallaxEnabled
                ? { x: tiagoXCombined, y: tiagoYCombined }
                : undefined
            }
          >
            <motion.div className="-translate-x-full text-[clamp(4rem,12vw,18vh)] italic font-bold text-(--color-text-secondary)">
              <AnimatedElement
                className={`text-[clamp(4rem,12vw,18vh)] italic font-bold text-(--color-text-secondary) `}
                direction="left"
                delay={200}
              >
                Tiago
              </AnimatedElement>
            </motion.div>
          </motion.div>
          <motion.img
            src={photo}
            alt={language === "pt" ? "Foto de Tiago Massuda" : "Photo of Tiago Massuda"}
            className="z-10 w-[78%] max-w-88 rounded-b-full shadow-[0_30px_5px_-16px_rgba(0,0,0,0.2)] sm:w-[62%] md:mr-40 md:w-[48%] md:max-w-none lg:mr-50 lg:w-2/5"
            style={
              isParallaxEnabled
                ? { x: imageXCombined, y: imageYCombined, rotateZ: imageRotate }
                : undefined
            }
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[28%] hidden md:block"
            style={
              isParallaxEnabled
                ? { x: massudaXCombined, y: massudaYCombined }
                : undefined
            }
          >
            <AnimatedElement
              className="text-[clamp(4rem,12vw,18vh)] italic font-bold text-(--color-text-secondary)"
              direction="right"
              delay={400}
            >
              Massuda
            </AnimatedElement>
          </motion.div>
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
        </section>
        <AboutMe />
        <section
          id="projects"
          aria-labelledby="projects-title"
          className="w-full flex flex-col  border-t-20 border-b-20 border-(--color-panel) border-double  items-center py-14  md:py-16 lg:py-20 transition-colors duration-300 bg-(--color-bg-main) "
        >
          <h2
            id="projects-title"
            className="mt-2 w-full text-center text-3xl text-(--color-text-secondary) font-bold sm:text-4xl"
          >
            {language === "pt" ? "Meus Principais Projetos" : "My Main Projects"}
          </h2>
          <Carousel data={projects} />
        </section>
        <section
          id="technologies"
          aria-labelledby="technologies-title"
          className="flex w-full flex-col gap-6 bg-(--color-panel) px-4 py-14 sm:px-8 md:px-12 md:py-16 lg:px-20 lg:py-20 transition-colors duration-300"
        >
          <h2
            id="technologies-title"
            className="mt-2 w-full text-center text-3xl text-(--color-text-secondary) font-bold sm:text-4xl"
          >
            {language === "pt" ? "Minhas Tecnologias" : "My Technologies"}
          </h2>
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
                aria-pressed={selectedCategory === category}
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
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
