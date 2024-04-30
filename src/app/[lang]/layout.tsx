import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TLocale, i18n } from "../../../i18n.config";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Providers } from "@/providers";

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

export default function RootLayout({
  children,
  params,
}: PropsWithChildren<RootLayoutProps>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`w-full bg-white dark:bg-gray-900 relative ${inter.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
