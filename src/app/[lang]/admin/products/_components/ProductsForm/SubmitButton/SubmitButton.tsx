"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`border border-solid border-blue-300 text-blue-300 font-semibold  rounded-md p-3 my-6 hover:bg-blue-500 hover:text-white duration-150 disabled:hover:opacity-50`}
    >
      {pending ? "ADDING..." : "ADD"}
    </button>
  );
}
