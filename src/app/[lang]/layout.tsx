import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TLocale, i18n } from "../../../i18n.config";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Providers } from "@/providers";
import { getDictionaries } from "@/lib/dictionary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Marketplace",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface RootLayoutProps {
  params: { lang: TLocale };
}

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<RootLayoutProps>) {
  const { page } = await getDictionaries(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`bg-white dark:bg-gray-900 relative  ${inter.className}`}
      >
        <Providers lang={params.lang} dictionary={{ page }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
