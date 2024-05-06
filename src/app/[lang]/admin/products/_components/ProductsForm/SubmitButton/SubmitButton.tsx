"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEdit?: boolean;
}

export function SubmitButton({ isEdit }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`border border-solid border-blue-300 text-blue-300 font-semibold rounded-md p-3 my-6 hover:bg-blue-500 hover:text-white duration-150 disabled:bg-blue-500 disabled:hover:opacity-50 disabled:opacity-50 disabled:hover:text-blue-300`}
    >
      {isEdit == null
        ? pending
          ? "ADDING..."
          : "ADD"
        : pending
        ? "EDITING..."
        : "EDIT"}
    </button>
  );
}
