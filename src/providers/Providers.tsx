"use client";

import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getDictionaries } from "@/lib/dictionary";
import { TLocale } from "../../i18n.config";

interface ProvidersProps {
  dictionary: Awaited<ReturnType<typeof getDictionaries>>;
  lang: TLocale;
}

export function Providers({
  children,
  dictionary,
  lang,
}: PropsWithChildren<ProvidersProps>) {
  return (
    <AuthProvider lang={lang}>
      <LocaleProvider dictionary={dictionary}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}
