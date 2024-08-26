"use client";

import { LoadingIcon } from "@/assets/icons";
import { PropsWithChildren } from "react";

interface DualButtonProps {
  size?: "large" | "asChild" | "medium";
  type?: "button" | "submit";
  variation?: "primary" | "secondary" | "warning" | "blue";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  loadSpinnerText?: string;
}

export function DualButton({
  size,
  children,
  type,
  variation,
  disabled,
  onClick,
  loadSpinnerText,
}: PropsWithChildren<DualButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`border border-add disabled:z-10 disabled:pointer-events-none rounded-md w-full bg-add hover:opacity-75 disabled:opacity-60 duration-100 ${
        variation === "secondary"
          ? "bg-custom-white text-add"
          : variation === "warning"
          ? "bg-alert text-custom-white border-alert"
          : variation === "blue"
          ? "bg-add-3 text-custom-white"
          : "bg-add text-custom-white"
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
      {loadSpinnerText ? (
        <div className="flex items-center justify-center gap-x-3">
          {loadSpinnerText}
          <LoadingIcon className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
