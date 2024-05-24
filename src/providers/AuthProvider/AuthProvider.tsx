import { TUser } from "@/@types/general";
import { createUser } from "@/app/[lang]/_api/createUser";
import { getUser } from "@/app/[lang]/_api/getUser";
import { auth, db, googleProvider } from "@/firebase";
import { AuthContext } from "@/providers/AuthProvider";
import {
  Auth,
  User,
  deleteUser,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState, useEffect } from "react";

export function AuthProvider({ children }: PropsWithChildren) {
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname();

  async function getCurrentUser(email: string) {
    const currUser = await getUser(email);
    setCurrentUser(currUser ? currUser : null);
  }

  async function checkUser(email?: string | null) {
    try {
      setLoadingUser(true);
      if (email == null) return;

      const user = await getUser(email);

      if (user) {
        return setCurrentUser(user);
      } else {
        const newUser: Omit<TUser, "id"> = {
          name: "",
          surname: "",
          email,
          spentInCents: 0,
          ownings: [],
          isFrozen: false,
        };

        await createUser(newUser);
        getCurrentUser(email);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingUser(false);
    }
  }

  async function handleUserDelete(user: User | null) {
    try {
      if (user == null) return;

      const userToDelete = await getUser(user?.email!);

      if (userToDelete == null) {
        return await deleteUser(user);
      } else {
        const userDoc = doc(db, "users", userToDelete.id);
        return await Promise.all([deleteUser(user), deleteDoc(userDoc)]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (
      !pathname.includes("sign-up") &&
      auth.currentUser &&
      !auth.currentUser.emailVerified
    ) {
      handleUserDelete(auth.currentUser);
    }

    if (auth.currentUser == null) return;

    checkUser(auth.currentUser.email);
  }, [auth.currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        checkUser(user?.email);
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
        loadingUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
