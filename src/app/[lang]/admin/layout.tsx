import { TLocale } from "../../../../i18n.config";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { getDictionaries } from "@/lib/dictionary";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { Header } from "@/app/[lang]/_components/Header";

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
      <Header lang={lang} forAdmin>
        <NavLink
          path={`/${lang}/admin`}
          title={page.dashboard.toLocaleUpperCase()}
        />
        <NavLink
          path={`/${lang}/admin/products`}
          title={page.products.toLocaleUpperCase()}
        />
        <NavLink
          path={`/${lang}/admin/customers`}
          title={page.customers.toLocaleUpperCase()}
        />
      </Header>
      {children}
    </>
  );
}
