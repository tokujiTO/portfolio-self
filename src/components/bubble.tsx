import { useState } from "react";

export default function Bubble() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  const expand = () => {
    if (!isExpanded) {
      setTimeout(() => setShowIcon(false), 100);
    } else {
      setTimeout(() => setShowIcon(true), 100);
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={expand}
      className={`
        ${isExpanded ? "w-200" : "w-12"} 
        h-12 flex items-center justify-center
        delay-100
        p-4 bg-white/50 backdrop-blur-md rounded-full shadow-lg 
        cursor-pointer text-lg text-[#333333] 
        transition-all duration-500 ease-in-out overflow-hidden
      `}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        {!isExpanded && (
          <span
            className={`shrink-0 duration-100 transition-all ${showIcon ? "opacity-100" : "opacity-0"}`}
          >
            X
          </span>
        )}
      </div>
    </div>
  );
}
