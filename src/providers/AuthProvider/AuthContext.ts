import { TUser } from "@/@types/general";
import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextProps {
  currentUser: TUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loadingUser: boolean;
  handleUserDelete: (user: User | null) => Promise<void | [void, void]>;
  handleLogOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  loadingUser: false,
  handleUserDelete: async () => {},
  handleLogOut: async () => {},
});
