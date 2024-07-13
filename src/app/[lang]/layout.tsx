import { TLocale, i18n } from "../../../i18n.config";
import "@/app/[lang]/globals.css";
import type { Metadata } from "next";
import { Inter, Monoton } from "next/font/google";
import { PropsWithChildren } from "react";
import { Providers } from "@/providers";
import { getDictionaries } from "@/lib/dictionary";

const inter = Inter({ subsets: ["latin"] });

const monoton = Monoton({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-monoton",
  weight: "400",
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
        className={`bg-custom-white dark:bg-gray-900 relative ${monoton.variable} ${inter.className}`}
      >
        <Providers lang={params.lang} dictionary={{ page }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
