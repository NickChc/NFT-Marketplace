"use client";

import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useFormState } from "react-dom";
import { login } from "@/app/[lang]/(client)/auth/_actions/auth";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter } from "next/navigation";

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

export function LoginForm() {
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
    </form>
  );
}
