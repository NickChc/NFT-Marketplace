import { TLocale } from "../../../../i18n.config";
import { PropsWithChildren } from "react";
import { getDictionaries } from "@/lib/dictionary";
import { Header } from "@/app/[lang]/_components/Header";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { BackgroundImage } from "@/app/[lang]/(client)/_component/BackgroundImage";
import { Modal } from "@/app/[lang]/_components/Modal";
import { ProductViewMore } from "@/app/[lang]/(client)/_component/ProductViewMore";
import { Logo } from "@/app/[lang]/_components/Logo";

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
    <div>
      <Header lang={lang}>
        <NavLink title={page.home} path={`/${lang}`} />
        <NavLink title={page.products} path={`/${lang}/products`} />
        <NavLink title={page.info} path={`/${lang}/info`} />
      </Header>
      <BackgroundImage />
      <Modal lang={lang} />
      <ProductViewMore lang={lang} />

      <div className="mx-auto w-full md:w-[90%] lg:w-[80%] bg-custom-white dark:bg-gray-900 z-20 relative">
        <Logo lang={lang} />
        {children}
      </div>
    </div>
  );
}
