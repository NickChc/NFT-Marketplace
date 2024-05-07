import { LocaleContext } from "@/providers/LocaleProvider";
import { PropsWithChildren } from "react";
import { TTranslations } from "@/@types/general";

interface LocaleProviderProps {
  dictionary: TTranslations;
}

export function LocaleProvider({
  children,
  dictionary,
}: PropsWithChildren<LocaleProviderProps>) {
  return (
    <LocaleContext.Provider value={{ dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}
