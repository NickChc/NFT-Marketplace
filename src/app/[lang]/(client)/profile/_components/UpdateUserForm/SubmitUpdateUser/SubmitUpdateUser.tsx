"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

interface SubmitUpdateUserProps {
  text: string;
  pendingText: string;
}

export function SubmitUpdateUser({ text, pendingText }: SubmitUpdateUserProps) {
  const { pending } = useFormStatus();
  const { getCurrentUser, currentUser } = useAuthProvider();

  useEffect(() => {
    return () => {
      if (currentUser == null) return;
      getCurrentUser(undefined, currentUser.uid);
    };
  }, [pending]);

  return (
    <button
      disabled={pending}
      className="mt-3 bg-purple-800 p-2 w-full rounded-sm text-white hover:opacity-75 disabled:cursor-default disabled:opacity-75"
      type="submit"
    >
      {pending ? pendingText : text}
    </button>
  );
}
