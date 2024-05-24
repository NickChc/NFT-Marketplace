"use client";

import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useFormState } from "react-dom";
import { register } from "@/app/[lang]/(client)/auth/_actions/auth";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase";
import { TUser } from "@/@types/general";
import { createUser } from "@/app/[lang]/_api/createUser";
import { deleteUser } from "firebase/auth";
import { TLocale } from "../../../../../../../i18n.config";

interface RegisterFormProps {
  lang: TLocale;
}

export function RegisterForm({ lang }: RegisterFormProps) {
  const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
  const [verification, setVerification] = useState<"sent" | "rest">("rest");
  const [verificationError, setVerificationError] = useState("");
  const [error, action] = useFormState(
    register.bind(null, redirectAfterRegister, verificationStatuschange),
    {}
  );
  const translations = useDictionary();
  const { page } = translations;
  const router = useRouter();

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
        router.push(`/${lang}`);
      } else {
        await deleteUser(auth.currentUser);
        setVerificationError("Problem occured, please try again");
        setLoadingVerify(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
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

        <SubmitBtn pendingText={`${page.registering}...`}>
          {page.register}
        </SubmitBtn>
        <div className="flex flex-col items-stretch gap-y-4 absolute bottom-14 right-0 left-0">
          {verificationError !== "" && (
            <div className="bg-white text-red-500 text-center">
              {verificationError}
              <span
                className="absolute right-2 cursor-pointer text-black text-xl"
                onClick={() => setVerificationError("")}
              >
                x
              </span>
            </div>
          )}
          {verification === "sent" && (
            <div className="bg-white text-black flex items-center justify-around gap-x-4">
              Email verification sent to your inbox, please verify to continue
              <button
                disabled={loadingVerify}
                onClick={(e) => {
                  e.stopPropagation();
                  confirmVerified();
                }}
              >
                {loadingVerify ? "Loading..." : "Verified!"}
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
