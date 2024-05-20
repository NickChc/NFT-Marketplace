import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export function useAuthProvider() {
  const { ...data } = useContext(AuthContext);

  return { ...data };
}
