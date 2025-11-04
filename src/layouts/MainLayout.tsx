"use client";

import { ReactNode } from "react";
import { togglePanel } from "../stores/togglePanel";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

interface Props {
  children: ReactNode;
}

export const MainLayout = observer(({ children }: Props) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/98/54/d3/9854d3bba674b0a857af17dfea76dc0d.jpg')",
      }}
      onClick={togglePanel.close}
    >
      <div
        className={clsx(
          "bg-gray-800/50 transition-all duration-300 overflow-y-auto",
          togglePanel.isPanel
            ? "w-[900px] h-[520px] rounded-3xl"
            : "w-full h-screen"
        )}
      >
        {children}
      </div>
    </div>
  );
});
