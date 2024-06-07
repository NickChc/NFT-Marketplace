import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalProvider/GlobalContext";

export function useGlobalProvider() {
  const { ...data } = useContext(GlobalContext);

  return { ...data };
}
