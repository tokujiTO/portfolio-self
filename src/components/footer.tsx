import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="bg-(--color-footer) text-(--color-text-tertiary) py-12 w-full px-8 shadow-xl z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Lado Esquerdo: Identidade */}
        <div className="text-center md:text-left">
          <h2 className="text-(--color-text-secondary) font-bold tracking-tighter text-xl mb-2 italic">
            TIAGO MASSUDA
          </h2>
          <p className="text-sm max-w-xs">
            Desenvolvendo soluções escaláveis em Cloud e interfaces modernas com
            React e Flutter.
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/tokujiTO"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <GithubLogoIcon size={32} />
          </a>
          <a
            href="https://linkedin.com/in/tiago-tokugi-massuda"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <LinkedinLogoIcon size={32} />
          </a>
          <a
            href="mailto:tiagomassuda123@gmail.com"
            className="hover:text-white transition-colors"
          >
            <EnvelopeSimpleIcon size={32} />
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
        <p className="mt-4 md:mt-0 opacity-50">Built with React & Passion</p>
      </div>
    </footer>
  );
};

export default Footer;
