"use client";

import { useFormStatus } from "react-dom";

interface SubmitDeclineBtnProps {
  text: string;
  onClick: () => void;
}

export function SubmitDeclineBtn({ text, onClick }: SubmitDeclineBtnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="disabled:opacity-75 disabled:cursor-default w-full px-2 py-1 rounded-md border-solid border border-purple-800 bg-purple-800 hover:opacity-75 duration-100"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
