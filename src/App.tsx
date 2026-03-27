import AnimatedElement from "./components/animatedElement";
import Navbar from "./components/navbar";
import photo from "./assets/68ba2c58-eef4-40e4-81de-ada512adafcd Background Removed.png";
import AboutMe from "./components/Sections/aboutMe";
import Footer from "./components/footer";
import Card from "./components/card";

function App() {
  const tecnologies = [
    { skill: "React", level: "Avançado" },
    { skill: "TypeScript", level: "Avançado" },
    { skill: "RStudio", level: "Básico" },
    { skill: "JavaScript", level: "Intermediário" },
    { skill: "MySQL", level: "Intermediário" },
    { skill: "Tableau", level: "Básico" },
    { skill: "Python", level: "Intermediário" },
    { skill: "React Native", level: "Intermediário" },
    { skill: "MongoDB", level: "Básico" },
    { skill: "Java", level: "Intermediário" },
    { skill: "Git/GitHub", level: "Avançado" },
    { skill: "AWS", level: "Básico" },
    { skill: "VBA", level: "Intermediário" },
    { skill: "UML Modeling", level: "Avançado" },
    { skill: "C", level: "Básico" },
    { skill: "Azure", level: "Intermediário" },
    { skill: "Astah", level: "Intermediário" },
    { skill: "Estatística", level: "Intermediário" },
    { skill: "Figma", level: "Intermediário" },
    { skill: "R", level: "Intermediário" },
    { skill: "Algoritmos", level: "Intermediário" },
    { skill: "Excel", level: "Intermediário" },
    { skill: "Power BI", level: "Básico" },
    { skill: "Flutter", level: "Avançado" },
    { skill: "Microsoft Office", level: "Intermediário" },
    { skill: "Jupyter", level: "Intermediário" },
    { skill: "Dart", level: "Avançado" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projects = [
    {
      name: "Projeto 1",
      description: "Descrição do projeto 1",
      github: "https://github.com/seu-usuario/projeto-1",
    },
  ];

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
      <div className="flex flex-wrap gap-4 w-full bg-[var(--color-panel)] px-10 py-20 transition-colors duration-300">
        {tecnologies.map((tech) => (
          <Card key={tech.skill} skill={tech.skill} description={tech.level} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
