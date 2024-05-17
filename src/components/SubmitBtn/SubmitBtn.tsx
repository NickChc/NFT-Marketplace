"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

interface SubmitBtnProps {
  pendingText: string;
}

export function SubmitBtn({
  children,
  pendingText,
}: PropsWithChildren<SubmitBtnProps>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`border border-solid border-blue-500 text-blue-500 font-semibold rounded-md p-3 my-6 hover:bg-blue-500 hover:text-white duration-150 disabled:bg-blue-500 disabled:hover:opacity-50 disabled:opacity-50 disabled:text-blue-300 disabled:hover:text-blue-300`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
