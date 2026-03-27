import { useMemo, useState } from "react";
import AnimatedElement from "./components/animatedElement";
import Navbar from "./components/navbar";
import photo from "./assets/68ba2c58-eef4-40e4-81de-ada512adafcd Background Removed.png";
import AboutMe from "./components/Sections/aboutMe";
import Footer from "./components/footer";
import Card from "./components/card";
import Carousel from "./components/carousel";
import { projects } from "./assets/projects";
import { tecnologies } from "./assets/tecnologies";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [changing, setChanging] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(tecnologies.map((tech) => tech.category)),
    );

    return ["All", ...uniqueCategories];
  }, []);

  const filteredTechnologies = useMemo(() => {
    if (selectedCategory === "All") {
      return tecnologies;
    }

    return tecnologies.filter((tech) => tech.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex items-center flex-col overflow-y-hidden min-h-screen bg-linear-to-b from-(--color-bg-main-from) to-(--color-bg-main-to) text-(--color-text-primary) transition-colors duration-300">
      <Navbar />
      <div className="h-8" />
      <div className="flex relative flex-col mb-[-20vh] items-center pr-60  min-h-50 w-full px-10">
        <AnimatedElement
          className="text-[16vh] absolute italic top-1/5 left-1/3 -translate-x-[74%] font-bold"
          direction="left"
          delay={200}
        >
          Tiago
        </AnimatedElement>
        <img
          src={photo}
          alt="Profile"
          className="w-1/2 shadow-[0_30px_5px_-16px_rgba(0,0,0,0.2)] z-10 rounded-b-full"
        />
        <AnimatedElement
          className="text-[16vh] absolute italic top-1/3 left-1/2 font-bold"
          direction="right"
          delay={400}
        >
          Massuda
        </AnimatedElement>
        <AnimatedElement
          className="text-[3vh] flex absolute italic top-11/20 left-3/5 font-bold"
          direction="bottom"
        >
          <AnimatedElement className="flex" direction="bottom" delay={100}>
            Cloud Specialist
          </AnimatedElement>{" "}
          <AnimatedElement className="flex" direction="bottom" delay={200}>
            Software Developer
          </AnimatedElement>{" "}
          <AnimatedElement className="flex" direction="bottom" delay={300}>
            Cybersecurity Enthusiast
          </AnimatedElement>
        </AnimatedElement>
      </div>
      <AboutMe />
      <Carousel data={projects} />
      <div className="flex w-full flex-col gap-6 bg-(--color-panel) px-10 py-20 transition-colors duration-300">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setChanging(true);
                setTimeout(
                  () => setSelectedCategory(category),
                  filteredTechnologies.length * 60 + 300,
                );
                setTimeout(
                  () => setChanging(false),
                  filteredTechnologies.length * 60 + 600,
                );
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                selectedCategory === category
                  ? "border-transparent bg-(--color-card) text-(--color-text-primary)"
                  : "border-(--color-border-soft) bg-transparent text-(--color-text-secondary) hover:bg-(--color-surface)"
              }`}
            >
              {category} -{" "}
              {category === "All"
                ? tecnologies.length
                : tecnologies.filter((tech) => tech.category === category)
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
            Nenhuma tecnologia encontrada para este filtro.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
