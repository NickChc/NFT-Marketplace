"use client";

import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getDictionaries } from "@/lib/dictionary";

interface ProvidersProps {
  dictionary: Awaited<ReturnType<typeof getDictionaries>>;
}

export function Providers({
  children,
  dictionary,
}: PropsWithChildren<ProvidersProps>) {
  return (
    <AuthProvider>
      <LocaleProvider dictionary={dictionary}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}
