"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TLocale } from "../../../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";

interface AuthHeaderProps {
  lang: TLocale;
}

export function AuthHeader({ lang }: AuthHeaderProps) {
  const pathname = usePathname();
  const translations = useDictionary();

  return (
    <div className="w-[80%] mx-auto flex items-center justify-end gap-x-4 mt-3 md:text-xl pb-4 max-w-4xl">
      {pathname.endsWith("sign-in") ? (
        <div className="flex flex-col gap-y-2 sm:flex-row items-center justify-between w-full">
          <Link className="underline" href={`/${lang}/auth/forgot-password`}>
            {translations.page.forgotPassword}?
          </Link>
          <div className="flex flex-col sm:flex-row text-end gap-x-1 sm:gap-x-3">
            <h3 className="whitespace-nowrap">
              {translations.page.dontHaveAnAccount}?
            </h3>
            <Link className="underline" href={`/${lang}/auth/sign-up`}>
              {translations.page.signUpCap}
            </Link>
          </div>
        </div>
      ) : pathname.endsWith("sign-up") ? (
        <div className="flex flex-col sm:flex-row text-end sm:justify-between w-full">
          <h3>{translations.page.alreadyHaveAnAccount}?</h3>
          <Link className="underline whitespace-nowrap" href={`/${lang}/auth/sign-in`}>
            {translations.page.signInCap}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
