"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

export function DropdownMenu({
  label,
  items,
}: {
  label: ReactNode;
  items: { text: string; onClick?: () => void; danger?: boolean }[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        className="cursor-pointer flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>

      <div
        className={`absolute right-0 z-50 mt-2 w-48 rounded-md border bg-zinc-900 shadow-md transition-all duration-200 ease-in-out transform ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-1">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick?.();
                setSelectedIndex(i);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-emerald-500/50 select-none
                  ${item.danger ? "text-red-600" : ""} ${
                selectedIndex === i ? "bg-emerald-500/30" : ""
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
