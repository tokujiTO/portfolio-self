import { motion } from "motion/react";
import {
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Reveal } from "../reveal";
import { useLanguage } from "../../context/languageContext";

const EMAIL = "tiagomassuda123@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/tokujiTO", Icon: GithubLogo },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tiago-tokugi-massuda",
    Icon: LinkedinLogo,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tokuji_massuda/",
    Icon: InstagramLogo,
  },
];

export function Contact() {
  const { language } = useLanguage();

  return (
    <section
      id="contato"
      className="text-center transition-colors duration-500"
      style={{
        background: "var(--contactbg)",
        color: "var(--contactfg)",
        padding: "clamp(56px,9vw,110px) clamp(20px,5vw,48px)",
        marginTop: "clamp(40px,6vw,72px)",
      }}
    >
      <Reveal className="mx-auto" style={{ maxWidth: 640 }}>
        <h2
          className="font-syne m-0"
          style={{
            fontSize: "clamp(30px,5vw,52px)",
            lineHeight: 1.05,
            fontWeight: 700,
            marginBottom: 16,
            color: "var(--contactfg)",
            textShadow: "var(--glow)",
          }}
        >
          {language === "pt"
            ? "Vamos construir algo juntos?"
            : "Let's build something together?"}
        </h2>
        <p
          className="font-dm mx-auto"
          style={{
            fontSize: "clamp(14px,1.6vw,17px)",
            lineHeight: 1.6,
            color: "var(--contactmut)",
            marginBottom: 30,
          }}
        >
          {language === "pt"
            ? "Aberto a novos projetos, colaborações e conversas sobre tecnologia."
            : "Open to new projects, collaborations and tech conversations."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-[14px]">
          <motion.a
            onClick={() => (window.location.href = `mailto:${EMAIL}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="font-dm inline-flex items-center gap-2 rounded-[10px] font-bold"
            style={{
              fontSize: 13,
              padding: "14px 30px",
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 8px 24px -6px var(--accent)",
            }}
          >
            <EnvelopeSimple size={16} weight="bold" />
            {language === "pt" ? "Fale comigo" : "Get in touch"}
          </motion.a>

          <div className="flex gap-[10px]">
            {SOCIALS.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border transition-colors duration-300 hover:[border-color:var(--accent)] hover:[color:var(--accent)]"
                style={{
                  borderColor: "rgba(255,255,255,.25)",
                  color: "var(--contactfg)",
                }}
              >
                <Icon size={18} weight="fill" />
              </motion.a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
