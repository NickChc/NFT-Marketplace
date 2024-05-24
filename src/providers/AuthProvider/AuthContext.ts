import { TUser } from "@/@types/general";
import { createContext } from "react";

interface AuthContextProps {
  currentUser: TUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loadingUser: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  loadingUser: false,
});
