"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEdit?: boolean;
}

export function SubmitButton({ isEdit }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const dictionary = useDictionary();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`border border-solid border-blue-500 text-blue-500 font-semibold rounded-md p-3 my-6 hover:bg-blue-500 hover:text-white duration-150 disabled:bg-blue-500 disabled:hover:opacity-50 disabled:opacity-50 disabled:text-blue-300 disabled:hover:text-blue-300`}
    >
      {isEdit
        ? pending
          ? `${dictionary.page.editing}...`
          : dictionary.page.edit
        : pending
        ? `${dictionary.page.adding}...`
        : dictionary.page.add}
    </button>
  );
}
