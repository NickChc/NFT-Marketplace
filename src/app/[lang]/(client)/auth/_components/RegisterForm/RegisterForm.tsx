"use client";

import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useFormState } from "react-dom";
import { register } from "@/app/[lang]/(client)/auth/_actions/auth";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase";
import { TLocale } from "../../../../../../../i18n.config";
import { useAuthProvider } from "@/providers/AuthProvider";
import { RegisterFormPopup } from "./RegisterFormPopup";

interface RegisterFormProps {
  lang: TLocale;
}

export function RegisterForm({ lang }: RegisterFormProps) {
  const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
  const [verification, setVerification] = useState<"sent" | "rest">("rest");
  const [verificationError, setVerificationError] = useState("");
  const [error, action] = useFormState(
    register.bind(
      null,
      redirectAfterRegister,
      verificationStatuschange,
      setVerificationError
    ),
    {}
  );
  const translations = useDictionary();
  const { page } = translations;
  const router = useRouter();
  const { handleUserDelete } = useAuthProvider();

  function redirectAfterRegister(path: string) {
    router.push(path);
  }

  function verificationStatuschange() {
    setVerification("sent");
  }

  async function confirmVerified() {
    try {
      setLoadingVerify(true);
      if (auth.currentUser == null) return;
      await auth.currentUser.reload();
      const verified = auth.currentUser?.emailVerified;
      if (verified) {
        router.replace(`/${lang}`);
      } else {
        await handleUserDelete(auth.currentUser);
        setVerificationError(page.problemOccuredTryAgain);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingVerify(false);
      setVerification("rest");
    }
  }

  return (
    <>
      <form
        action={action}
        className="flex flex-col gap-y-4 mx-auto mt-9 p-3 relative"
      >
        <FormInput name="name" label={page.name} required />
        {error?.name && <div className="text-red-700">{error.name}</div>}
        <FormInput name="surname" label={page.surname} required />
        {error?.surname && <div className="text-red-700">{error.surname}</div>}

        <FormInput name="email" label={page.email} type="email" required />
        {error?.email && <div className="text-red-700">{error.email}</div>}

        <FormInput
          name="password"
          label={page.password}
          type="password"
          required
        />
        {error?.password && (
          <div className="text-red-700">{error.password}</div>
        )}

        <FormInput
          required
          name="repeatPassword"
          label={page.repeatPassword}
          type="password"
        />
        {error?.repeatPassword && (
          <div className="text-red-700">{error.repeatPassword}</div>
        )}

        <SubmitBtn
          disabled={verificationError !== "" || verification === "sent"}
          pendingText={`${page.registering}...`}
        >
          {page.register}
        </SubmitBtn>
        {(verificationError || verification === "sent") && (
          <RegisterFormPopup
            verificationError={verificationError}
            setVerificationError={setVerificationError}
            verification={verification}
            loadingVerify={loadingVerify}
            confirmVerified={confirmVerified}
          />
        )}
      </form>
    </>
  );
}
