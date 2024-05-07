"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getDictionaries } from "@/lib/dictionary";

interface ProvidersProps {
  dictionary: Awaited<ReturnType<typeof getDictionaries>>;
}

export function Providers({ children, dictionary }: PropsWithChildren<ProvidersProps>) {
  return (
    <LocaleProvider dictionary={dictionary}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </LocaleProvider>
  );
}
