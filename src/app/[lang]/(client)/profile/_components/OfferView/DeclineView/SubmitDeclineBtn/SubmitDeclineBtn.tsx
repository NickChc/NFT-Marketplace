"use client";

import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useFormStatus } from "react-dom";

interface SubmitDeclineBtnProps {
  text: string;
  onClick: () => void;
}

export function SubmitDeclineBtn({ text, onClick }: SubmitDeclineBtnProps) {
  const { pending } = useFormStatus();
  return (
    <DualButton disabled={pending} type="submit" onClick={onClick}>
      {text}
    </DualButton>
  );
}
