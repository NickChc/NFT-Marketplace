import { TProduct } from "@/@types/general";
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
});
