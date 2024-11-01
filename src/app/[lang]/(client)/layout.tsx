import { TLocale } from "../../../../i18n.config";
import { PropsWithChildren } from "react";
import { getDictionaries } from "@/lib/dictionary";
import { Header } from "@/app/[lang]/_components/Header";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { Footer } from "@/app/[lang]/(client)/_component/Footer";
import { BackgroundImage } from "@/app/[lang]/(client)/_component/BackgroundImage";
import { Modal } from "@/app/[lang]/_components/Modal";
import { ProductViewMore } from "@/app/[lang]/(client)/_component/ProductViewMore";

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
        <NavLink title={page.home.toLocaleUpperCase()} path={`/${lang}`} />
        <NavLink
          title={page.products.toLocaleUpperCase()}
          path={`/${lang}/products`}
        />
        <NavLink title={page.info.toLocaleUpperCase()} path={`/${lang}/info`} />
      </Header>
      <BackgroundImage />
      <Modal lang={lang} />
      <ProductViewMore lang={lang} />

      <div className="mx-auto w-full md:w-[90%] lg:w-[80%] bg-custom-white dark:bg-add-2 z-20 relative">
        <div className="pb-9">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
