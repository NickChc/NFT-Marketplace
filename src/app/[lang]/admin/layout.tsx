import { PropsWithChildren } from "react";
import { TLocale } from "../../../../i18n.config";
import { Navigation } from "@/app/[lang]/_components/Navigation";
import { Metadata } from "next";

interface AdminLayoutProps {
  params: {
    lang: TLocale;
  };
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NFT Marketplace | Admin",
};

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
