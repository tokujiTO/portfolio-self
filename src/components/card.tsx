interface CardProps {
  skill: string;
  description: string;
}

export default function Card({ skill, description }: CardProps) {
  return (
    <div className="flex min-h-10 hover:scale-105 hover:shadow-2xl duration-300 transition-all hover:cursor-pointer p-4 min-w-30 flex-col bg-[var(--color-card)] text-[var(--color-text-primary)] rounded-2xl border border-[var(--color-border-soft)]">
      <h2 className="font-bold ">{skill}</h2>
      <p>Nível: {description}</p>
    </div>
  );
}
