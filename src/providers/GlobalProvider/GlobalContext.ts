import { TProduct, TUser } from "@/@types/general";
import { createContext } from "react";

interface GlobalContextProps {
  collection: TProduct[];
  setCollection: React.Dispatch<React.SetStateAction<TProduct[]>>;
  returnItem: null | TProduct;
  setReturnItem: React.Dispatch<React.SetStateAction<TProduct | null>>;
  sellProduct: TProduct | null;
  setSellProduct: React.Dispatch<React.SetStateAction<TProduct | null>>;
  stopSellingProduct: TProduct | null;
  setStopSellingProduct: React.Dispatch<React.SetStateAction<TProduct | null>>;
  updateUser: TUser | null;
  setUpdateUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  bidItem: TProduct | null;
  setBidItem: React.Dispatch<React.SetStateAction<TProduct | null>>;
  offerItem: TProduct | null;
  setOfferItem: React.Dispatch<React.SetStateAction<TProduct | null>>;
  deleteUser: TUser | null;
  setDeleteUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  collection: [],
  setCollection: () => {},
  returnItem: null,
  setReturnItem: () => {},
  sellProduct: null,
  setSellProduct: () => {},
  stopSellingProduct: null,
  setStopSellingProduct: () => {},
  updateUser: null,
  setUpdateUser: () => {},
  bidItem: null,
  setBidItem: () => {},
  offerItem: null,
  setOfferItem: () => {},
  deleteUser: null,
  setDeleteUser: () => {},
});