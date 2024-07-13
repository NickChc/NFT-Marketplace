"use client";

import { PropsWithChildren } from "react";

interface DualButtonProps {
  size?: "large" | "asChild" | "medium";
  type?: "button" | "submit";
  variation?: "primary" | "secondary" | "warning" | "blue";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

export function DualButton({
  size,
  children,
  type,
  variation,
  disabled,
  onClick,
}: PropsWithChildren<DualButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`border-solid border border-purple-800 disabled:z-10 disabled:pointer-events-none rounded-md w-full bg-purple-800 hover:opacity-75 disabled:opacity-60 duration-100 ${
        variation === "secondary"
          ? "bg-white text-purple-800"
          : variation === "warning"
          ? "bg-red-500 text-white border-red-500"
          : variation === "blue"
          ? "bg-blue-500 text-white"
          : "bg-purple-800 text-white"
      } ${
        size === "large"
          ? "p-3 font-semibold"
          : size === "asChild"
          ? "flex"
          : size === "medium"
          ? "px-2 py-1 md:px-3 md:py-2"
          : "px-2 py-1"
      }`}
    >
      {children}
    </button>
  );
}
