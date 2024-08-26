"use client";

import { TLocale } from "../../i18n.config";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { PropsWithChildren, useEffect } from "react";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getDictionaries } from "@/lib/dictionary";
import { usePathname } from "next/navigation";

interface ProvidersProps {
  dictionary: Awaited<ReturnType<typeof getDictionaries>>;
  lang: TLocale;
}

export function Providers({
  children,
  dictionary,
  lang,
}: PropsWithChildren<ProvidersProps>) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <GlobalProvider>
      <AuthProvider lang={lang}>
        <LocaleProvider dictionary={dictionary}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
