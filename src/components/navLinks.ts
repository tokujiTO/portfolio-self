export interface NavLink {
  href: string;
  pt: string;
  en: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#sobre", pt: "Sobre", en: "About" },
  { href: "#trajetoria", pt: "Trajetória", en: "Journey" },
  { href: "#tecnologias", pt: "Tecnologias", en: "Stack" },
  { href: "#projetos", pt: "Projetos", en: "Work" },
  { href: "#contato", pt: "Contato", en: "Contact" },
];
