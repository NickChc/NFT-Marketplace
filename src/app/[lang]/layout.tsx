import { TLocale, i18n } from "../../../i18n.config";
import type { Metadata } from "next";
import { Inter, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Providers } from "@/providers";
import { getDictionaries } from "@/lib/dictionary";

const inter = Inter({ subsets: ["latin"] });

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
  weight: "600",
});

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
        className={`bg-custom-white dark:bg-gray-900 relative ${poppins.variable} ${openSans.variable} ${inter.className}`}
      >
        <Providers lang={params.lang} dictionary={{ page }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
