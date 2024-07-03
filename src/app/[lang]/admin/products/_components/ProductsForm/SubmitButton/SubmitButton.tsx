"use client";

import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useDictionary } from "@/hooks/useDictionary";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEdit?: boolean;
}

export function SubmitButton({ isEdit }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const dictionary = useDictionary();

  return (
    <DualButton size="large" type="submit" disabled={pending}>
      {isEdit
        ? pending
          ? `${dictionary.page.editing}...`
          : dictionary.page.edit
        : pending
        ? `${dictionary.page.adding}...`
        : dictionary.page.add}
    </DualButton>
  );
}
