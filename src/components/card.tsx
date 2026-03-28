interface CardProps {
  changing?: boolean;
  skill: string;
  index: number;
  description: string;
  category?: string;
}

import { useLanguage } from "../context/languageContext";

export default function Card({
  skill,
  description,
  index,
  category,
  changing,
}: CardProps) {
  const { language } = useLanguage();

  return (
    <div
      className={`flex w-full min-h-10 p-4 sm:w-auto sm:min-w-30 hover:scale-105 hover:shadow-2xl duration-75 transition-all hover:cursor-pointer ${changing ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"} flex-col gap-1 bg-(--color-card) text-(--color-text-primary) rounded-2xl border border-(--color-border-soft)`}
      style={{ transitionDelay: `${index * 28}ms` }}
    >
      {category && (
        <span className="w-fit rounded-full border border-(--color-border-soft) bg-(--color-surface) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          {category}
        </span>
      )}
      <h2 className="font-bold">{skill}</h2>
      <p>
        {language === "pt" ? "Nível" : "Level"}: {description}
      </p>
    </div>
  );
}
