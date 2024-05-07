import { useContext } from "react";
import { LocaleContext } from "@/providers/LocaleProvider";

export function useLocaleProvider() {
  const { ...data } = useContext(LocaleContext);

  return { ...data };
}
