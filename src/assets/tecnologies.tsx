import type { Language } from "../types/language";

export type TechnologyCategoryKey =
  | "frontend"
  | "backend"
  | "mobile"
  | "data"
  | "devops"
  | "cloud"
  | "architecture"
  | "design"
  | "productivity";

type TechnologyLevelKey = "basic" | "intermediate" | "advanced";

interface BaseTechnology {
  skill: string;
  levelKey: TechnologyLevelKey;
  categoryKey: TechnologyCategoryKey;
}

export interface TechnologyItem {
  skill: string;
  level: string;
  category: string;
  categoryKey: TechnologyCategoryKey;
}

const categoryTranslations: Record<
  TechnologyCategoryKey,
  Record<Language, string>
> = {
  frontend: { pt: "Frontend", en: "Frontend" },
  backend: { pt: "Backend", en: "Backend" },
  mobile: { pt: "Mobile", en: "Mobile" },
  data: { pt: "Dados", en: "Data" },
  devops: { pt: "DevOps", en: "DevOps" },
  cloud: { pt: "Cloud", en: "Cloud" },
  architecture: { pt: "Arquitetura", en: "Architecture" },
  design: { pt: "Design", en: "Design" },
  productivity: { pt: "Produtividade", en: "Productivity" },
};

const levelTranslations: Record<
  TechnologyLevelKey,
  Record<Language, string>
> = {
  advanced: { pt: "Avançado", en: "Advanced" },
  intermediate: { pt: "Intermediário", en: "Intermediate" },
  basic: { pt: "Básico", en: "Basic" },
};

const baseTechnologies: BaseTechnology[] = [
  { skill: "React", levelKey: "advanced", categoryKey: "frontend" },
  { skill: "TypeScript", levelKey: "advanced", categoryKey: "frontend" },
  { skill: "RStudio", levelKey: "basic", categoryKey: "data" },
  { skill: "JavaScript", levelKey: "intermediate", categoryKey: "frontend" },
  { skill: "MySQL", levelKey: "intermediate", categoryKey: "backend" },
  { skill: "Tableau", levelKey: "basic", categoryKey: "data" },
  { skill: "Python", levelKey: "intermediate", categoryKey: "backend" },
  { skill: "React Native", levelKey: "intermediate", categoryKey: "mobile" },
  { skill: "MongoDB", levelKey: "basic", categoryKey: "backend" },
  { skill: "Java", levelKey: "intermediate", categoryKey: "backend" },
  { skill: "Git/GitHub", levelKey: "advanced", categoryKey: "devops" },
  { skill: "AWS", levelKey: "basic", categoryKey: "cloud" },
  { skill: "VBA", levelKey: "intermediate", categoryKey: "data" },
  {
    skill: "UML Modeling",
    levelKey: "advanced",
    categoryKey: "architecture",
  },
  { skill: "C", levelKey: "basic", categoryKey: "backend" },
  { skill: "Azure", levelKey: "intermediate", categoryKey: "cloud" },
  { skill: "Astah", levelKey: "intermediate", categoryKey: "architecture" },
  { skill: "Estatística", levelKey: "intermediate", categoryKey: "data" },
  { skill: "Figma", levelKey: "intermediate", categoryKey: "design" },
  { skill: "R", levelKey: "intermediate", categoryKey: "data" },
  { skill: "Algoritmos", levelKey: "intermediate", categoryKey: "backend" },
  { skill: "Excel", levelKey: "intermediate", categoryKey: "data" },
  { skill: "Power BI", levelKey: "basic", categoryKey: "data" },
  { skill: "Flutter", levelKey: "advanced", categoryKey: "mobile" },
  {
    skill: "Microsoft Office",
    levelKey: "intermediate",
    categoryKey: "productivity",
  },
  { skill: "Jupyter", levelKey: "intermediate", categoryKey: "data" },
  { skill: "Dart", levelKey: "advanced", categoryKey: "mobile" },
];

export function getCategoryLabel(
  language: Language,
  categoryKey: TechnologyCategoryKey,
) {
  return categoryTranslations[categoryKey][language];
}

export function getTechnologies(language: Language): TechnologyItem[] {
  return baseTechnologies.map((tech) => ({
    skill: tech.skill,
    level: levelTranslations[tech.levelKey][language],
    category: categoryTranslations[tech.categoryKey][language],
    categoryKey: tech.categoryKey,
  }));
}
