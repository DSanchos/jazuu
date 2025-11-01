import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={clsx(
        "cursor-pointer flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
