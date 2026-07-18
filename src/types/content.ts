export type Localized = { pt: string; en: string };

export interface Project {
  id: string;
  category: Localized; // eyebrow, e.g. { pt: "IDENTIDADE VISUAL", en: "BRAND IDENTITY" }
  title: string; // proper noun, not translated
  description: Localized;
  gradient: string; // CSS gradient for the card's color accent stripe
  href?: string; // optional — omit for undisclosed/private repos
}

export interface Experience {
  id: string;
  role: Localized;
  company: string;
  description: Localized;
  period: string; // "2026 —", "2025 — 26"
  current?: boolean; // true → accent left-border + accent period color
}

export type TechCategory = "frontend" | "data" | "backend" | "tools";

export interface Technology {
  name: string; // "React", "TypeScript", …
  category: TechCategory; // groups the chip under a filter
  icon?: string; // optional Phosphor icon name for future use
}
