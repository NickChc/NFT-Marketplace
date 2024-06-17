import { TUser } from "@/@types/general";
import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextProps {
  currentUser: TUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loadingUser: boolean;
  handleUserDelete: (
    user: User | null,
    callback?: () => void,
    onError?: (error: string) => void
  ) => Promise<void | [void, void]>;
  handleLogOut: () => Promise<void>;
  getCurrentUser: (email?: string, uid?: string) => Promise<void>;
  authProvider: "google" | "password" | undefined;
  setAuthProvider: React.Dispatch<
    React.SetStateAction<"google" | "password" | undefined>
  >;
  reauthenticate: (user: User, blank?: boolean) => Promise<void | boolean>;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  loadingUser: false,
  handleUserDelete: async () => {},
  handleLogOut: async () => {},
  getCurrentUser: async () => {},
  authProvider: undefined,
  setAuthProvider: () => {},
  reauthenticate: async () => {},
});
