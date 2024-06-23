"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useAuthProvider } from "@/providers/AuthProvider";

interface SubmitUpdateUserProps {
  text: string;
  pendingText: string;
}

export function SubmitUpdateUser({ text, pendingText }: SubmitUpdateUserProps) {
  const [changed, setChanged] = useState<boolean>(false);
  const { pending } = useFormStatus();
  const { getCurrentUser, currentUser } = useAuthProvider();

  useEffect(() => {
    return () => {
      if (currentUser == null || !changed) return;
      getCurrentUser(undefined, currentUser.uid);
    };
  }, [pending, changed]);

  return (
    <>
      <div className="my-2"></div>
      <DualButton
        size="medium"
        onClick={(e) => setChanged(true)}
        disabled={pending}
        type="submit"
      >
        {pending ? pendingText : text}
      </DualButton>
    </>
  );
}
