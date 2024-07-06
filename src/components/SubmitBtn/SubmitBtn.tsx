"use client";

import { DualButton } from "@/app/[lang]/_components/DualButton";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

interface SubmitBtnProps {
  pendingText: string;
  disabled?: boolean;
}

export function SubmitBtn({
  children,
  pendingText,
  disabled,
}: PropsWithChildren<SubmitBtnProps>) {
  const { pending } = useFormStatus();

  return (
    <DualButton
      variation="blue"
      disabled={pending || disabled}
      size="large"
      onClick={() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }
    >
      {pending ? pendingText : children}
    </DualButton>
  );
}
