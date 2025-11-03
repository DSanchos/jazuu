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
          "url('https://steamuserimages-a.akamaihd.net/ugc/2037370312486230092/400CC408A1D47A81034C7593FD63285AD8871EC5/?imw=512&amp;imh=288&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true')",
      }}
      onClick={togglePanel.close}
    >
      <div
        className={clsx(
          "bg-gray-800/50 transition-all duration-300 overflow-y-auto",
          togglePanel.isPanel ? "w-[900px] h-[520px] rounded-3xl" : "w-full h-screen"
        )}
      >
        {children}
      </div>
    </div>
  );
});
