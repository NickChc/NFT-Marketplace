import { TLocale } from "../../../../../i18n.config";
import { PropsWithChildren } from "react";
import { LangSelect } from "@/app/[lang]/_components/LangSelect";
import { Navigation } from "@/app/[lang]/_components/Navigation";
import { ToggleTheme } from "@/app/[lang]/_components/ToggleTheme";
import { getDictionaries } from "@/lib/dictionary";

interface Headerprops {
  lang: TLocale;
}

export async function Header({ children, lang }: PropsWithChildren<Headerprops>) {
  const { page } = await getDictionaries(lang);
  return (
    <>
      <Navigation>
        <span className="hidden sm:block">
          <LangSelect lang={lang} />
        </span>
        <div className="flex flex-shrink justify-around mx-auto w-full sm:w-auto">
          {children}
        </div>
        <span className="hidden sm:block">
          <ToggleTheme />
        </span>
      </Navigation>
      <div className="flex sm:hidden px-4 py-1 sm:p-0 bg-purple-800 w-full items-center gap-x-6">
        <LangSelect lang={lang} />
        <ToggleTheme />
      </div>
    </>
  );
}
