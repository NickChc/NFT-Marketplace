import { TNotification, TOffer, TProduct, TUser } from "@/@types/general";
import { GlobalContext } from "@/providers/GlobalProvider/GlobalContext";
import { PropsWithChildren, useState } from "react";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [offerItem, setOfferItem] = useState<TProduct | null>(null);
  const [deleteUser, setDeleteUser] = useState<TUser | null>(null);
  const [collection, setCollection] = useState<TProduct[]>([]);
  const [returnItem, setReturnItem] = useState<null | TProduct>(null);
  const [bidItem, setBidItem] = useState<null | TProduct>(null);
  const [sellProduct, setSellProduct] = useState<TProduct | null>(null);
  const [stopSellingProduct, setStopSellingProduct] = useState<TProduct | null>(
    null
  );
  const [updateUser, setUpdateUser] = useState<TUser | null>(null);
  const [offerToView, setOfferToView] = useState<TOffer | null>(null);
  const [notifications, setNotifications] = useState<TNotification[]>([]);

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
        bidItem,
        setBidItem,
        deleteUser,
        setDeleteUser,
        offerItem,
        setOfferItem,
        offerToView,
        setOfferToView,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
