import { TLocale } from "../../../../../i18n.config";
import { PropsWithChildren } from "react";
import { LangSelect } from "@/app/[lang]/_components/LangSelect";
import { HeaderNav } from "@/app/[lang]/_components/HeaderNav";
import { ToggleTheme } from "@/app/[lang]/_components/ToggleTheme";
import { AuthButton } from "@/app/[lang]/(client)/_component/AuthButton";

interface HeaderProps {
  lang: TLocale;
  forAdmin?: boolean;
}

export async function Header({
  children,
  lang,
  forAdmin,
}: PropsWithChildren<HeaderProps>) {
  return (
    <header className="sticky top-0 right-0 left-0 z-50">
      <HeaderNav>
        <span className="hidden sm:block">
          <LangSelect lang={lang} />
        </span>
        <div className="grid grid-cols-3 mx-auto w-full sm:w-auto">
          {children}
        </div>
        <span className="hidden sm:block">
          <ToggleTheme />
        </span>
        {!forAdmin && (
          <span className="hidden sm:block">
            <AuthButton lang={lang} />
          </span>
        )}
      </HeaderNav>
      <div className="relative flex justify-between sm:hidden px-4 pb-1 pt-2 sm:p-0 bg-purple-800 w-full items-center ">
        <div className="flex items-center gap-x-6">
          <LangSelect lang={lang} />
          <ToggleTheme />
        </div>
        {!forAdmin && <AuthButton lang={lang} />}
      </div>
    </header>
  );
}
