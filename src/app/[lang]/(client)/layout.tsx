import { TLocale } from "../../../../i18n.config";
import { Navigation } from "@/app/[lang]/_components/Navigation";
import { LangSelect } from "@/app/[lang]/_components/LangSelect";
import { ToggleTheme } from "@/app/[lang]/_components/ToggleTheme";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { getDictionaries } from "@/lib/dictionary";
import { PropsWithChildren } from "react";

interface ClientLayoutProps {
  params: {
    lang: TLocale;
  };
}

export default async function ClientLayout({
  children,
  params: { lang },
}: PropsWithChildren<ClientLayoutProps>) {
  const { page } = await getDictionaries(lang);
  return (
    <>
      <Navigation>
        <LangSelect lang={lang} />
        <NavLink title={page.home} path={`/${lang}`} />
        <NavLink title={page.products} path={`/${lang}/products`} />
        <NavLink title={page.myCollection} path={`/${lang}/collection`} />
        <ToggleTheme />
      </Navigation>
      <div className="mx-6 container">{children}</div>
    </>
  );
}
