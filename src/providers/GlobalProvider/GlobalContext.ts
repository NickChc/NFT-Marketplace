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
});
