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
    <div className="lg:w-[90%] max-w-4xl mx-auto flex items-center justify-end gap-x-4 mt-3 text-sm md:text-xl pb-4">
      {pathname.endsWith("sign-in") ? (
        <div className="flex flex-col-reverse gap-y-2 sm:flex-row items-start px-3 sm:items-center justify-between w-full">
          <Link
            className="underline active:text-add"
            href={`/${lang}/auth/forgot-password`}
          >
            {translations.page.forgotPassword}?
          </Link>
          <div className="flex flex-col items-start sm:flex-row py-4 sm:py-0 sm:text-end gap-x-1 sm:gap-x-3">
            <h3 className="whitespace-nowrap">
              {translations.page.dontHaveAnAccount}?
            </h3>
            <Link
              className="underline active:text-add"
              href={`/${lang}/auth/sign-up`}
            >
              {translations.page.signUpCap}
            </Link>
          </div>
        </div>
      ) : pathname.endsWith("sign-up") ? (
        <div className="flex flex-col sm:flex-row text-start sm:text-end sm:justify-end gap-x-6 px-3 w-full sm:text-lg md:text-xl mt-3">
          <h3>{translations.page.alreadyHaveAnAccount}?</h3>
          <Link
            className="underline active:text-add whitespace-nowrap"
            href={`/${lang}/auth/sign-in`}
          >
            {translations.page.signInCap}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
