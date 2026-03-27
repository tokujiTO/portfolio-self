import { ArrowLineLeftIcon } from "@phosphor-icons/react";
import { ListIcon } from "@phosphor-icons/react/dist/icons/List";
import { useState } from "react";

export default function Bubble() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(true);

  const expand = () => {
    if (!isExpanded) {
      setShowIcon(false);
      setTimeout(() => setIsExpanded((prev) => !prev), 100);
      setShowCloseIcon(true);
    } else {
      setShowCloseIcon(false);
      setTimeout(() => setIsExpanded((prev) => !prev), 100);
      setTimeout(() => setShowIcon(true), 300);
    }
  };

  return (
    <div
      className={`
        ${isExpanded ? "w-200 justify-between" : "w-12 justify-center"} 
        h-12 flex items-center
        delay-100
        p-4 bg-(--color-surface) backdrop-blur-md rounded-full shadow-lg border border-(--color-border-soft)
        cursor-pointer text-lg text-(--color-text-primary)
        transition-all duration-500 ease-in-out overflow-hidden
      `}
    >
      <div
        className={`flex items-center w-full ${isExpanded ? "justify-between" : "justify-center"} gap-2 whitespace-nowrap`}
      >
        {!isExpanded && (
          <span
            className={`shrink-0 duration-100 transition-all ${showIcon ? "opacity-100 rotate-0" : "opacity-0 rotate-40"}`}
            onClick={expand}
          >
            <ListIcon size={32} />
          </span>
        )}
        {isExpanded && (
          <span className="font-bold tracking-tighter text-sm italic">
            Menu
          </span>
        )}
        {isExpanded && (
          <span
            className={`font-bold tracking-tighter duration-300 transition-all text-sm ${showCloseIcon ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-20"} italic`}
            onClick={expand}
          >
            <ArrowLineLeftIcon size={32} />
          </span>
        )}
      </div>
    </div>
  );
}
