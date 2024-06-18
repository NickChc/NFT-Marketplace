"use client";

import { PropsWithChildren } from "react";

interface DualButtonProps {
  type?: "button" | "submit";
  variation?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => any;
}

export function DualButton({
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
      className={`px-2 py-1 border-solid border border-purple-800 rounded-md w-full bg-purple-800 hover:opacity-75 duration-100 ${
        variation === "secondary"
          ? "bg-white text-purple-800"
          : "bg-purple-800 text-white"
      }`}
    >
      {children}
    </button>
  );
}
