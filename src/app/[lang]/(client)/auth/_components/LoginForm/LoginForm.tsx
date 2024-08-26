"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { login } from "@/app/[lang]/(client)/auth/_actions/auth";
import { useDictionary } from "@/hooks/useDictionary";
import { auth, googleProvider } from "@/firebase";
import { GoogleIcon } from "@/assets/icons";
import { LoginFormPopup } from "@/app/[lang]/(client)/auth/_components/LoginForm/LoginFormPopup";
import { PROVIDER } from "@/config/storageKeys";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { getProduct } from "@/app/[lang]/_api/getProduct";

interface FieldErrors {
  email?: string[];
  password?: string[];
}

interface AuthError {
  auth: string[];
}

function isFieldErrors(error: any): error is FieldErrors {
  return error.email || error.password;
}

function isAuthError(error: any): error is AuthError {
  return error.auth;
}

interface LoginFormProps {
  lang: TLocale;
}

export function LoginForm({ lang }: LoginFormProps) {
  const searchParams = useSearchParams();
  const { setOfferItem } = useGlobalProvider();
  const [loginError, setLoginError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, action] = useFormState(
    login.bind(null, redirectAfterLogin),
    {}
  );
  const translations = useDictionary();
  const { page } = translations;
  const router = useRouter();

  async function getOfferAfter(productId: string) {
    const bidAfterItem = await getProduct(productId);

    if (bidAfterItem == null) return;

    setOfferItem(bidAfterItem);
  }

  function redirectAfterLogin() {
    const purchase = searchParams.get("purchase");
    const offerAfter = searchParams.get("offerAfter");

    if (purchase) {
      router.replace(`/${lang}/products/${purchase}/buy`);
      return;
    }

    if (offerAfter) {
      getOfferAfter(offerAfter);
    }

    router.replace(`/${lang}`);
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem(PROVIDER, "google");
      const purchase = searchParams.get("purchase");
      const offerAfter = searchParams.get("offerAfter");
      if (purchase) {
        router.replace(`/${lang}/products/${purchase}/buy`);
        return;
      }

      if (offerAfter) {
        getOfferAfter(offerAfter);
      }

      router.replace(`/${lang}`);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      setLoginError(translations.page.problemOccuredTryAgain);
    }
  }

  return (
    <form
      action={action}
      className="flex flex-col gap-y-4 mx-auto mt-3 sm:mt-9 p-3"
    >
      <FormInput name="email" label={page.email} type="email" autoComplete />
      {isFieldErrors(error) && error.email && (
        <div className="text-red-700">{error.email.join(", ")}</div>
      )}

      <FormInput
        name="password"
        label={page.password}
        type="password"
        required
      />
      {isFieldErrors(error) && error.password && (
        <div className="text-red-700">{error.password.join(", ")}</div>
      )}

      {isAuthError(error) && (
        <div className="text-red-700 mt-6">{error.auth}</div>
      )}

      <hr className="invisible sm:my-3" />

      <SubmitBtn pendingText={`${page.loggingIn}...`}>{page.login}</SubmitBtn>
      <button
        type="button"
        disabled={loading}
        className="bg-custom-white border border-solid border-add-3 text-black font-semibold rounded-md p-3 my-2 hover:opacity-75 duration-150 disabled:bg-add-3 disabled:hover:opacity-50 disabled:opacity-50 disabled:text-blue-300 disabled:hover:text-blue-300 flex items-center justify-center gap-x-3 whitespace-nowrap text-sm sm:text-base"
        onClick={handleGoogleLogin}
      >
        {loading ? `${page.loading}...` : page.signInWithGoogle}{" "}
        <GoogleIcon className="text-xl sm:text-2xl" />
      </button>
      {loginError !== "" && (
        <LoginFormPopup
          error={loginError}
          closePopup={() => setLoginError("")}
        />
      )}
    </form>
  );
}
