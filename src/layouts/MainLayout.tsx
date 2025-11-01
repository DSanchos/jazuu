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
          "url('https://i.pinimg.com/originals/ad/44/41/ad4441b39519bd210a2dee4f2c93d6bf.gif')",
      }}
      onClick={togglePanel.close}
    >
      <div
        className={clsx(
          "bg-gray-800/60 transition-all duration-300 overflow-y-auto",
          togglePanel.isPanel ? "w-[900px] h-[520px]" : "w-full h-screen"
        )}
      >
        {children}
      </div>
    </div>
  );
});
