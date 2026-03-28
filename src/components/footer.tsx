import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useLanguage } from "../context/languageContext";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer
      id="contact"
      className="z-10 w-full bg-(--color-footer) px-4 py-10 text-(--color-text-tertiary) shadow-xl transition-colors duration-300 sm:px-6 md:px-8 md:py-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Lado Esquerdo: Identidade */}
        <div className="text-center md:text-left">
          <h2 className="text-(--color-text-secondary) font-bold tracking-tighter text-xl mb-2 italic">
            TIAGO MASSUDA
          </h2>
          <p className="text-sm max-w-xs">
            {language === "pt"
              ? "Desenvolvendo soluções escaláveis em Cloud e interfaces modernas com React e Flutter."
              : "Building scalable cloud solutions and modern interfaces with React and Flutter."}
          </p>
        </div>

        <div className="flex gap-5 sm:gap-6">
          <a
            href="https://github.com/tokujiTO"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <GithubLogoIcon size={28} />
          </a>
          <a
            href="https://linkedin.com/in/tiago-tokugi-massuda"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <LinkedinLogoIcon size={28} />
          </a>
          <a
            href="mailto:tiagomassuda123@gmail.com"
            className="hover:text-white transition-colors"
          >
            <EnvelopeSimpleIcon size={28} />
          </a>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-2 text-[10px] uppercase tracking-widest font-mono">
          <span className="px-2 py-1 border border-gray-700 rounded ">
            AWS Cloud
          </span>
          <span className="px-2 py-1 border border-gray-700 rounded ">
            Cybersecurity
          </span>
          <span className="px-2 py-1 border border-gray-700 rounded ">
            React/Flutter
          </span>
        </div>
      </div>

      {/* Linha Final */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-(--color-text-secondary) flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-widest">
        <p className="mt-4 md:mt-0 opacity-50">
          {language === "pt"
            ? "Construído com React e paixão"
            : "Built with React and passion"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
