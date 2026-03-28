import type { Language } from "../types/language";

interface LocalizedText {
  pt: string;
  en: string;
}

interface LocalizedProjectItem {
  title: LocalizedText;
  description: LocalizedText;
  place: LocalizedText;
  role: LocalizedText;
  technologies: string[];
  repository?: string;
  frontRepository?: string;
  backRepository?: string;
  linkedin?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  place: string;
  role: string;
  technologies: string[];
  repository?: string;
  frontRepository?: string;
  backRepository?: string;
  linkedin?: string;
}

const localizedProjects: LocalizedProjectItem[] = [
  {
    title: {
      pt: "Gamificação de questões de Biologia para Ensino Médio",
      en: "Gamification of Biology Questions for High School",
    },
    description: {
      pt: "Aplicação de gamificação para questões de Biologia, visando aumentar o engajamento e a retenção de conteúdo entre estudantes do ensino médio.",
      en: "Gamification application for Biology questions, aiming to increase engagement and content retention among high school students.",
    },
    place: {
      pt: "Instituto Mauá de Tecnologia",
      en: "Maua Institute of Technology",
    },
    role: {
      pt: "Desenvolvedor Full Stack / Project Owner",
      en: "Full Stack Developer / Project Owner",
    },
    technologies: ["Python", "MySQL", "Git"],
    repository: "https://github.com/tokujiTO/PII-1tri-2024",
  },
  {
    title: {
      pt: "Portfolio MauaEsports",
      en: "MauaEsports Portfolio",
    },
    description: {
      pt: "Portfólio para a comunidade MauaEsports, apresentando projetos e conquistas relacionadas ao esporte eletrônico.",
      en: "Portfolio for the MauaEsports community, showcasing projects and achievements related to esports.",
    },
    place: {
      pt: "Instituto Mauá de Tecnologia",
      en: "Maua Institute of Technology",
    },
    role: {
      pt: "Desenvolvedor Full Stack / Project Owner",
      en: "Full Stack Developer / Project Owner",
    },
    technologies: [
      "ReactTS",
      "MongoDB",
      "Python",
      "API",
      "Microsoft Azure",
      "Git",
    ],
    repository: "https://github.com/tokujiTO/PII3S-MauaEsports",
  },
  {
    title: {
      pt: "Sistema de Gestão de Torneios",
      en: "Tournament Management System",
    },
    description: {
      pt: "Plataforma robusta para organização e acompanhamento de competições em tempo real, com foco em performance e integridade de dados.",
      en: "Robust platform for organizing and tracking real-time competitions, focused on performance and data integrity.",
    },
    place: {
      pt: "Projeto Acadêmico Mauá em parceria com a Fontys University of Applied Sciences",
      en: "Maua Academic Project in partnership with Fontys University of Applied Sciences",
    },
    role: {
      pt: "Desenvolvedor Frontend e Backendhttps://github.com/fontys-maua-2526-tournament/web",
      en: "Frontend and Backend Developer",
    },
    technologies: [
      "ReactJS",
      "Tailwind CSS",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
    ],
    frontRepository: "https://github.com/fontys-maua-2526-tournament/web",
    backRepository: "https://github.com/fontys-maua-2526-tournament/api",
  },
  {
    title: {
      pt: "AWS Cloud Club Mauá",
      en: "AWS Cloud Club Maua",
    },
    description: {
      pt: "Liderança da comunidade estudantil oficial da AWS na Mauá, organizando eventos, workshops e disseminando a cultura Cloud Computing.",
      en: "Leadership of AWS's official student community at Maua, organizing events, workshops, and spreading cloud computing culture.",
    },
    place: {
      pt: "AWS Cloud Clubs",
      en: "AWS Cloud Clubs",
    },
    role: {
      pt: "Diretor de Organização",
      en: "Organization Director",
    },
    technologies: ["AWS", "Cloud Architecture", "Community Management"],
    linkedin:
      "https://www.linkedin.com/posts/tiago-massuda_aws-cloudclub-maua-activity-71654123456789-abcd",
  },
  {
    title: {
      pt: "PolIG",
      en: "PolIG",
    },
    description: {
      pt: "Aplicaticativo de geração de imagens por IA, utilizando modelos avançados para criar arte personalizada a partir de descrições textuais, com foco em qualidade e diversidade visual para auxiliar nas aulas.",
      en: "AI-powered image generation application, utilizing advanced models to create personalized art from textual descriptions, focusing on quality and visual diversity to assist in educational settings.",
    },
    place: {
      pt: "Instituto Mauá de Tecnologia",
      en: "Maua Institute of Technology",
    },
    role: {
      pt: "Desenvolvedor Mobile / Desenvolvedor Backend / Project Owner",
      en: "Mobile Developer / Backend Developer / Project Owner",
    },
    technologies: [
      "Google Cloud",
      "Cloud Architecture",
      "Flutter",
      "Dart",
      "Python",
      "FastAPI",
      "Git",
    ],
    frontRepository: "https://github.com/tokujiTO/PII4S_images_generator",
    backRepository: "https://github.com/tokujiTO/gemini-image-generation-api",
  },
  {
    title: {
      pt: "Dev Community Mauá",
      en: "Dev Community Maua",
    },
    description: {
      pt: "Diretor de Desenvolvimento da comunidade de tecnologia da Mauá, promovendo eventos, workshops e iniciativas para conectar estudantes com o mercado de tecnologia.",
      en: "Leadership of the technology community at Maua, promoting events, workshops, and initiatives to connect students with the technology market.",
    },
    place: {
      pt: "Dev Community Mauá",
      en: "Dev Community Maua",
    },
    role: {
      pt: "Diretor de Organização",
      en: "Organization Director",
    },
    technologies: [
      "AWS",
      "ReactTS",
      "Python",
      "Agile",
      "Cloud Architecture",
      "Community Management",
      "Event Organization",
      "Tech Talks",
    ],
    linkedin:
      "https://www.linkedin.com/posts/tiago-massuda_aws-cloudclub-maua-activity-71654123456789-abcd",
  },
  {
    title: {
      pt: "Dunamis Tênis de Mesa",
      en: "Dunamis Table Tennis",
    },
    description: {
      pt: "Desenvolvimento de identidade visual e aplicação de suporte para torneios de tênis de mesa, incluindo banners e logotipos.",
      en: "Visual identity design and support app development for table tennis tournaments, including banners and logos.",
    },
    place: {
      pt: "Torneio Dunamis",
      en: "Dunamis Tournament",
    },
    role: {
      pt: "Desenvolvedor Mobile e Designer",
      en: "Mobile Developer and Designer",
    },
    technologies: ["Flutter", "Adobe Illustrator", "Figma", "UI/UX Design"],
    repository: "https://github.com/tokujiTO/dunamisTM",
  },
];

export function getProjects(language: Language): ProjectItem[] {
  return localizedProjects.map((project) => ({
    title: project.title[language],
    description: project.description[language],
    place: project.place[language],
    role: project.role[language],
    technologies: project.technologies,
    repository: project.repository,
    frontRepository: project.frontRepository,
    backRepository: project.backRepository,
    linkedin: project.linkedin,
  }));
}
