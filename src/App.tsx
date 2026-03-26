import AnimatedElement from "./components/animatedElement";
import Navbar from "./components/navbar";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  return (
    <div className="flex items-center flex-col px-80 min-h-screen bg-linear-to-b from-[#e5e5e5] to-[#d5d5d5]">
      <Navbar />
      <div className="h-100" />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex justify-center items-center gap-4">
          <AnimatedElement>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            vitae veniam voluptate architecto temporibus laborum quis nulla
            totam, suscipit ex placeat. Ad repellat eveniet, hic vitae sunt
            quibusdam earum impedit.
          </AnimatedElement>
          <AnimatedElement direction="right" delay={200}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            vitae veniam voluptate architecto temporibus laborum quis nulla
            totam, suscipit ex placeat. Ad repellat eveniet, hic vitae sunt
            quibusdam earum impedit.
          </AnimatedElement>
        </div>
      ))}
    </div>
  );
}

export default App;
