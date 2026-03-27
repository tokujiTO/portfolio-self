import AnimatedElement from "../animatedElement";

export default function AboutMe() {
  return (
    <div className="flex flex-col text-(--color-text-secondary) rounded-tr-[30%] min-h-[120vh] pt-60 gap-8 bg-(--color-panel) mt-[-90hv] w-full py-20 transition-colors duration-300">
      <div className="flex w-full justify-center flex-col items-center min-h-[50vh]">
        <h1 className="font-bold text-2xl italic text-center">
          Computer Science Student @ Mauá | Cloud Specialist | Software
          Developer
        </h1>
        <span className="italic font-thin text-2xl">
          Transformando ideias complexas em experiências digitais seguras e
          escaláveis.
        </span>
      </div>
      <div className="flex flex-col px-60 text-justify gap-20 w-full">
        <h1 className="font-bold w-full text-center text-4xl mt-20">
          Sobre mim
        </h1>
        <div className="flex justify-center text-xl gap-24 items-center">
          <AnimatedElement
            className="flex min-h-[50vh] items-start"
            direction="left"
            delay={200}
          >
            Atualmente cursando Ciência da Computação no Instituto Mauá de
            Tecnologia (2024-2027), foco minha energia em construir o futuro da
            tecnologia na nuvem. Como Diretor de Organização do AWS Cloud Club
            Mauá, lidero iniciativas que conectam estudantes ao ecossistema AWS,
            promovendo o aprendizado prático e a disseminação de arquiteturas
            escaláveis.
          </AnimatedElement>
          <div className="h-[60vh] border-2 border-(--color-text-secondary)" />
          <AnimatedElement
            className="flex min-h-[50vh] items-end"
            direction="right"
            delay={400}
          >
            Minha abordagem ao desenvolvimento une o rigor da Cybersecurity com
            a fluidez do Design UI/UX. Sou entusiasta da estética
            retro-futurista e Y2K, o que influencia diretamente minha busca por
            interfaces limpas e funcionais. Além do código, sou movido pela
            fotografia, filosofia oriental e pelo constante aprendizado de novas
            linguagens como Flutter e React.
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
