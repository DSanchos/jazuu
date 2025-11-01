import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalLayoutProps {
  children: ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("portal");
    setModalRoot(root);
  }, []);

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
}
