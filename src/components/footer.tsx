const LINKS = [
  { label: "GitHub", href: "https://github.com/tokujiTO" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tiago-tokugi-massuda" },
  { label: "Instagram", href: "https://www.instagram.com/tokuji_massuda/" },
  { label: "Email", href: "mailto:tiagomassuda123@gmail.com" },
];

export function Footer() {
  return (
    <footer
      className="flex flex-col items-start gap-4 border-t md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-5"
      style={{ padding: "36px clamp(20px,5vw,48px)", borderColor: "var(--line)" }}
    >
      <div className="font-syne font-extrabold" style={{ fontSize: 16, color: "var(--ink)" }}>
        増田 TIAGO
      </div>

      <div
        className="font-dm flex gap-[22px]"
        style={{ fontSize: 12, color: "var(--muted)" }}
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="transition-colors duration-200 hover:[color:var(--accent)]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p
        className="mono m-0 font-bold"
        style={{ fontSize: 9, letterSpacing: ".14em", color: "var(--faint)" }}
      >
        © 2026 TIAGO MASSUDA
      </p>
    </footer>
  );
}
