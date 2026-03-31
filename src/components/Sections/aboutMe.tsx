import AnimatedElement from "../animatedElement";
import { useLanguage } from "../../context/languageContext";

export default function AboutMe() {
  const { language } = useLanguage();

  return (
    <div
      id="about"
      // shadow to top
      className="flex w-full flex-col gap-10 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.2)] rounded-tr-[18%] bg-(--color-panel) px-4 py-14 pt-28 text-(--color-text-secondary) transition-colors duration-300 sm:px-8 md:rounded-tr-[24%] md:px-12 md:py-16 md:pt-40 lg:gap-12 lg:px-20 lg:py-20 lg:pt-48"
    >
      <div className="flex min-h-[34vh] w-full flex-col items-center justify-center text-center md:min-h-[42vh]">
        <h1 className=" text-center text-xl font-bold italic leading-snug sm:text-2xl md:text-3xl">
          {language === "pt"
            ? "Estudante de Ciência da Computação @ Mauá | Especialista em Cloud | Desenvolvedor de Software"
            : "Computer Science Student @ Maua | Cloud Specialist | Software Developer"}
        </h1>
        <span className="mt-3 max-w-4xl text-center text-base italic font-thin sm:text-lg md:text-2xl">
          {language === "pt"
            ? "Transformando ideias complexas em experiências digitais seguras e escaláveis."
            : "Turning complex ideas into secure and scalable digital experiences."}
        </span>
      </div>
      <div className="flex w-full flex-col gap-8 text-justify md:gap-12">
        <h1 className="mt-2 w-full text-center text-3xl font-bold sm:text-4xl">
          {language === "pt" ? "Sobre mim" : "About me"}
        </h1>
        <div className="flex flex-col items-stretch justify-center gap-8 text-base sm:text-lg md:text-xl lg:flex-row lg:gap-14">
          <AnimatedElement
            className="flex min-h-[30vh] items-start"
            direction="left"
            delay={200}
          >
            {language === "pt"
              ? "Atualmente cursando Ciência da Computação no Instituto Mauá de Tecnologia (2024-2027), foco minha energia em construir o futuro da tecnologia na nuvem. Como Diretor de Organização do AWS Cloud Club Mauá, lidero iniciativas que conectam estudantes ao ecossistema AWS, promovendo o aprendizado prático e a disseminação de arquiteturas escaláveis."
              : "Currently pursuing a Computer Science degree at Maua Institute of Technology (2024-2027), I focus my energy on building the future of cloud technology. As Organization Director at AWS Cloud Club Maua, I lead initiatives that connect students to the AWS ecosystem, promoting hands-on learning and scalable architecture practices."}
          </AnimatedElement>
          <div className="hidden w-px border border-(--color-text-secondary)/60 lg:block" />
          <AnimatedElement
            className="flex min-h-[30vh] items-start lg:items-end"
            direction="right"
            delay={400}
          >
            {language === "pt"
              ? "Minha abordagem ao desenvolvimento une o rigor da Cybersecurity com a fluidez do Design UI/UX. Sou entusiasta da estética retro-futurista e Y2K, o que influencia diretamente minha busca por interfaces limpas e funcionais. Além do código, sou movido pela fotografia, filosofia oriental e pelo constante aprendizado de novas linguagens como Flutter e React."
              : "My development approach combines the rigor of cybersecurity with the fluidity of UI/UX design. I am an enthusiast of retro-futurist and Y2K aesthetics, which directly influences my pursuit of clean and functional interfaces. Beyond code, I am driven by photography, Eastern philosophy, and continuous learning of technologies such as Flutter and React."}
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
