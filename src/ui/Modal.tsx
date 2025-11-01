"use client";

import { ReactNode } from "react";
import { PortalLayout } from "../layouts/PortalLayout";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
}

export function Modal({ isOpen, setOpen, children }: Props) {
  return (
    <PortalLayout>
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={clsx(
            "select-none transform transition-all duration-300 ease-out",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </PortalLayout>
  );
}
