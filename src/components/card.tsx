interface CardProps {
  changing?: boolean;
  skill: string;
  index: number;
  description: string;
  category?: string;
}

export default function Card({
  skill,
  description,
  index,
  category,
  changing,
}: CardProps) {
  return (
    <div
      className={`flex min-h-10 hover:scale-105 hover:shadow-2xl duration-150 transition-all hover:cursor-pointer p-4 min-w-30 ${changing ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"} flex-col gap-1 bg-(--color-card) text-(--color-text-primary) rounded-2xl border border-(--color-border-soft)`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {category && (
        <span className="w-fit rounded-full border border-(--color-border-soft) bg-(--color-surface) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          {category}
        </span>
      )}
      <h2 className="font-bold">{skill}</h2>
      <p>Nível: {description}</p>
    </div>
  );
}
