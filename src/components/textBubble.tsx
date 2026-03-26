interface BubbleProps {
  text?: string;
  icon?: React.ReactNode;
}

export default function Bubble({ text, icon }: BubbleProps) {
  return (
    <div
      className={`w-fit
        h-12 flex items-center justify-center
        p-4 bg-white/50 backdrop-blur-md rounded-full shadow-lg 
        cursor-pointer text-lg text-[#333333] 
        transition-all duration-500 ease-in-out overflow-hidden
      `}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        {icon && <span className="shrink-0">{icon}</span>}
        {text}
      </div>
    </div>
  );
}
