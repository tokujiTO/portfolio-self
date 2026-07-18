import { Reveal } from "./reveal";

interface SectionHeaderProps {
  title: string;
  label: string;
}

export function SectionHeader({ title, label }: SectionHeaderProps) {
  return (
    <Reveal
      className="mb-[26px] flex items-baseline justify-between border-b pb-3"
      style={{ borderColor: "var(--line)" }}
    >
      <h2
        className="font-syne m-0 font-bold"
        style={{
          fontSize: "clamp(26px,4vw,40px)",
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
      <span
        className="mono font-bold"
        style={{ fontSize: "10px", color: "var(--accent)" }}
      >
        / {label}
      </span>
    </Reveal>
  );
}
