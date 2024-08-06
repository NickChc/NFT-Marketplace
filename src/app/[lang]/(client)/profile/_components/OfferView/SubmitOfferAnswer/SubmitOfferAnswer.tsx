"use client";

import { DualButton } from "@/app/[lang]/_components/DualButton";
import { LoadingIcon } from "@/assets/icons";
import { useState } from "react";
import { useFormStatus } from "react-dom";

interface SubmitDeclineBtnProps {
  text: string;
  onClick?: () => void;
}

export function SubmitOfferAnswer({ text, onClick }: SubmitDeclineBtnProps) {
  const { pending } = useFormStatus();

  return (
    <DualButton disabled={pending} type="submit" onClick={onClick}>
      <div className="flex items-center justify-center gap-x-3">
        {text}
        {pending && <LoadingIcon className="animate-spin" />}
      </div>
    </DualButton>
  );
}
