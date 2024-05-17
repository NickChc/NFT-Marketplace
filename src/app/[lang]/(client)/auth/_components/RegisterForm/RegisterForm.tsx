"use client";

import { FormInput } from "@/components/FormInput";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useFormState } from "react-dom";
import { register } from "@/app/[lang]/(client)/auth/_actions/auth";
import { useDictionary } from "@/hooks/useDictionary";

export function RegisterForm() {
  const [error, action] = useFormState(register, {});
  const translations = useDictionary();
  const { page } = translations;

  return (
    <form action={action} className="flex flex-col gap-y-4 mx-auto mt-9">
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
      {error?.password && <div className="text-red-700">{error.password}</div>}

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
    </form>
  );
}
