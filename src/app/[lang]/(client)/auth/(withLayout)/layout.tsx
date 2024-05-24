import { PropsWithChildren } from "react";
import { AuthHeader } from "@/app/[lang]/(client)/auth/(withLayout)/_components/AuthHeader";
import { TLocale } from "../../../../../../i18n.config";

interface ClientAuthLayoutProps {
  params: {
    lang: TLocale;
  };
}

export default async function ClientAuthLayout({
  children,
  params: { lang },
}: PropsWithChildren<ClientAuthLayoutProps>) {
  return (
    <>
      {children}
      <AuthHeader lang={lang} />
    </>
  );
}
