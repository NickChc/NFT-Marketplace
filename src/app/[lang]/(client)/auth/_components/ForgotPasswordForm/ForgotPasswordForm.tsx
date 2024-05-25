"use client";

import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useDictionary } from "@/hooks/useDictionary";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { ForgotPasswordFormPopup } from "./ForgotPasswordFormPopup";
import { TLocale } from "../../../../../../../i18n.config";

interface ForgotPasswordFormProps {
  lang: TLocale;
}

export function ForgotPasswordForm({ lang }: ForgotPasswordFormProps) {
  const [sending, setSending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"sent" | "rest">("rest");
  const [error, setError] = useState<string>("");

  const translations = useDictionary();
  const { page } = translations;

  async function sendRecovery(email: string) {
    return await sendPasswordResetEmail(auth, email);
  }

  async function sendPasswordReset(forResend?: boolean) {
    try {
      if (!forResend) {
        setSending(true);
      }
      await sendRecovery(email);
      setStatus("sent");
    } catch (error: any) {
      console.log(error.message);
      setError(translations.page.problemOccuredTryAgain);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendPasswordReset();
  }

  return (
    <form
      className="flex flex-col gap-y-4 mx-auto mt-3 sm:mt-9 p-3 relative"
      onSubmit={handleSubmit}
    >
      <FormInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        label={page.email}
        type="email"
        required
      />

      <SubmitBtn disabled={sending} pendingText="">
        {sending ? `${page.sending}...` : page.send}
      </SubmitBtn>
      {(status === "sent" || error !== "") && (
        <ForgotPasswordFormPopup
          resend={() => sendPasswordReset(true)}
          lang={lang}
          error={error}
          closePopup={() => {
            setError("");
            setStatus("rest");
          }}
        />
      )}
    </form>
  );
}
