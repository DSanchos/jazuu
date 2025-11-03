"use client";

import { observer } from "mobx-react-lite";
import { togglePanel } from "../stores/togglePanel";
import Link from "next/link";
import { House, Scroll, Library } from "lucide-react";
import clsx from "clsx";

export const OpenPanel = observer(() => {
  return (
    <div
      className="absolute top-0 left-0 w-25 h-full flex items-center"
      onMouseEnter={togglePanel.open}
    >
      <nav
        className={clsx(
          "bg-zinc-800/20 backdrop-blur-md rounded-4xl border-white/10 border-3 px-3 py-3 ml-10 gap-6 transition-all duration-300 ease-in-out",
          togglePanel.isPanel
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        )}
      >
        <Link
          href={"/"}
          className="transition-all duration-300 hover:text-emerald-800"
        >
          <House size={32} />
        </Link>
        <Link
          href={"/library"}
          className="transition-all duration-300 hover:text-emerald-800"
        >
          <Library size={32} />
        </Link>
        <Link
          href={"/list"}
          className="transition-all duration-300 hover:text-emerald-800"
        >
          <Scroll size={32} />
        </Link>
      </nav>
    </div>
  );
});
