import { TLocale } from "../../../../i18n.config";
import { PropsWithChildren } from "react";
import { getDictionaries } from "@/lib/dictionary";
import { Header } from "@/app/[lang]/_components/Header";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { CollectionLink } from "@/app/[lang]/(client)/_component/CollectionLink";

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
      <Header lang={lang}>
        <NavLink title={page.home} path={`/${lang}`} />
        <NavLink title={page.products} path={`/${lang}/products`} />
        <NavLink title={page.info} path={`/${lang}/info`} />
        <CollectionLink
          title={page.myCollection}
          path={`/${lang}/collection`}
        />
      </Header>
      <div className="mx-auto container">{children}</div>
    </>
  );
}
