import { TUser } from "@/@types/general";
import { getUser } from "@/app/[lang]/_api/getUser";
import { auth } from "@/firebase";
import { AuthContext } from "@/providers/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, useState, useEffect } from "react";

export function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getCurrentUser(email: string) {
    const currUser = await getUser(email);
    setCurrentUser(currUser ? currUser : null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        getCurrentUser(user.email);
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
