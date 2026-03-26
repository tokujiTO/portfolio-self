interface BubbleProps {
  text?: string;
  onClick?: () => void;
}

export default function Bubble({ text, onClick }: BubbleProps) {
  return (
    <div
      className="w-fit p-4 h-fit bg-[#ffffff]/50 backdrop-blur-md rounded-full  shadow-lg cursor-pointer text-lg text-[#333333] hover:bg-[#ffffff]/50 transition-colors duration-300"
      onClick={onClick}
    >
      {text}
    </div>
  );
}
