import { PropsWithChildren } from "react";
import { TLocale } from "../../../../i18n.config";
import { Navigation } from "@/app/[lang]/_components/Navigation";
import { ToggleTheme } from "@/app/[lang]/_components/ToggleTheme";

interface AdminLayoutProps {
  params: {
    lang: TLocale;
  };
}

export default function AdminLayout({
  children,
  params: { lang },
}: PropsWithChildren<AdminLayoutProps>) {
  return (
    <>
      <Navigation lang={lang} />
      {children}
    </>
  );
}
