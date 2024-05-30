import { TLocale } from "../../../../i18n.config";
import { PropsWithChildren } from "react";
import { getDictionaries } from "@/lib/dictionary";
import { Header } from "@/app/[lang]/_components/Header";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { CollectionLink } from "@/app/[lang]/(client)/_component/CollectionLink";
import Image from "next/image";
import BackgroundImage from "@/assets/images/TestBackground2.jpg";

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
      <div className="w-full relative">
        <div className="absolute z-0 inset-0">
          <Image
            src={BackgroundImage}
            alt="test image"
            objectFit="cover"
            layout="fill"
            className="pointer-events-none"
          />
        </div>

        <div className="mx-auto w-full md:w-[90%] lg:w-[80%] bg-white dark:bg-gray-900 z-20 relative">
          {children}
        </div>
      </div>
    </>
  );
}
