import AnimatedElement from "./components/animatedElement";
import Navbar from "./components/navbar";
import photo from "./assets/68ba2c58-eef4-40e4-81de-ada512adafcd Background Removed.png";

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
    <div className="flex items-center flex-col gap-8 overflow-y-hidden min-h-screen bg-linear-to-b from-[#e5e5e5] to-[#d5d5d5]">
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
        <img src={photo} alt="Profile" className="w-1/2 z-10 rounded-b-full" />
        <AnimatedElement
          className="text-[16vh] absolute italic top-1/3 left-1/2 font-bold"
          direction="right"
          delay={400}
        >
          Massuda
        </AnimatedElement>
      </div>
      <div className="flex flex-col text-white rounded-tr-[30%] px-80 pt-60 gap-8 bg-[#3c3c3c] mt-[-90hv] w-full py-20">
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
    </div>
  );
}

export default App;
