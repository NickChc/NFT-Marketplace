import { TProduct } from "@/@types/general";
import { createContext } from "react";
import { TModalStatus_Enum } from "./GlobalProvider";

interface GlobalContextProps {
  collection: TProduct[];
  setCollection: React.Dispatch<React.SetStateAction<TProduct[]>>;
  returnItem: null | TProduct;
  setReturnItem: React.Dispatch<React.SetStateAction<TProduct | null>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  collection: [],
  setCollection: () => {},
  returnItem: null,
  setReturnItem: () => {},
});
