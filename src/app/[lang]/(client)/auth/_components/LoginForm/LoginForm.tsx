"use client";

import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useFormState } from "react-dom";
import { login } from "@/app/[lang]/(client)/auth/_actions/auth";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { TLocale } from "../../../../../../../i18n.config";
import { GoogleIcon } from "@/assets/icons";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [error, action] = useFormState(
    login.bind(null, redirectAfterLogin),
    {}
  );
  const translations = useDictionary();
  const { page } = translations;
  const router = useRouter();

  function redirectAfterLogin(path: string) {
    router.push(path);
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push(`/${lang}`);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={action} className="flex flex-col gap-y-4 mx-auto mt-9 p-3">
      <FormInput name="email" label={page.email} type="email" required />
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

      <SubmitBtn pendingText={`${page.loggingIn}...`}>{page.login}</SubmitBtn>
      <button
        type="button"
        disabled={loading}
        className="bg-white border border-solid border-blue-500 text-black font-semibold rounded-md p-3 my-2 hover:opacity-75 duration-150 disabled:bg-blue-500 disabled:hover:opacity-50 disabled:opacity-50 disabled:text-blue-300 disabled:hover:text-blue-300 flex items-center justify-center gap-x-3"
        onClick={handleGoogleLogin}
      >
        {loading ? "Loading..." : "Sign In With Google"}{" "}
        <GoogleIcon className="text-xl sm:text-2xl" />
      </button>
    </form>
  );
}
