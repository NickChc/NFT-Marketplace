import { TLocale } from "../../../../i18n.config";
import { PropsWithChildren } from "react";
import { Navigation } from "@/app/[lang]/_components/Navigation";
import { Metadata } from "next";
import { getDictionaries } from "@/lib/dictionary";
import { LangSelect } from "@/app/[lang]/_components/LangSelect";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { ToggleTheme } from "@/app/[lang]/_components/ToggleTheme";



interface AdminLayoutProps {
  params: {
    lang: TLocale;
  };
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NFT Marketplace | Admin",
};

export default async function AdminLayout({
  children,
  params: { lang },
}: PropsWithChildren<AdminLayoutProps>) {
  const { page } = await getDictionaries(lang);
  return (
    <>
      <Navigation>
        <LangSelect lang={lang} />
        <NavLink path={`/${lang}/admin`} title={page.dashboard} />
        <NavLink path={`/${lang}/admin/products`} title={page.products} />
        <NavLink path={`/${lang}/admin/customers`} title={page.customers} />
        <ToggleTheme />
      </Navigation>
      {children}
    </>
  );
}
