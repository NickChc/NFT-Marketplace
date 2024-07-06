import { TLocale } from "../../../../../../i18n.config";
import { PropsWithChildren } from "react";
import { AuthHeader } from "@/app/[lang]/(client)/auth/(withLayout)/_components/AuthHeader";

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
    <div className="min-h-full pb-6">
      {children}
      <AuthHeader lang={lang} />
    </div>
  );
}
