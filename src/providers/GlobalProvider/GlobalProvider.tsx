import { TProduct } from "@/@types/general";
import { GlobalContext } from "@/providers/GlobalProvider/GlobalContext";
import { PropsWithChildren, useState } from "react";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [collection, setCollection] = useState<TProduct[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        collection,
        setCollection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
