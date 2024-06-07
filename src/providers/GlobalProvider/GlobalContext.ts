import { TProduct } from "@/@types/general";
import { createContext } from "react";

interface GlobalContextProps {
  collection: TProduct[];
  setCollection: React.Dispatch<React.SetStateAction<TProduct[]>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  collection: [],
  setCollection: () => {},
});
