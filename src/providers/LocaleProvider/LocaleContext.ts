import { TTranslations } from "@/@types/general";
import { createContext } from "react";



interface LocaleContextProps {
  dictionary: TTranslations | undefined;
}

export const LocaleContext = createContext<LocaleContextProps>({
    dictionary: undefined,
});
