import { TProduct, TUser } from "@/@types/general";
import { GlobalContext } from "@/providers/GlobalProvider/GlobalContext";
import { PropsWithChildren, useState } from "react";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [collection, setCollection] = useState<TProduct[]>([]);
  const [returnItem, setReturnItem] = useState<null | TProduct>(null);
  const [sellProduct, setSellProduct] = useState<TProduct | null>(null);
  const [stopSellingProduct, setStopSellingProduct] = useState<TProduct | null>(
    null
  );
  const [updateUser, setUpdateUser] = useState<TUser | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        collection,
        setCollection,
        returnItem,
        setReturnItem,
        sellProduct,
        setSellProduct,
        stopSellingProduct,
        setStopSellingProduct,
        updateUser,
        setUpdateUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
