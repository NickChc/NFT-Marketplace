import { PropsWithChildren, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TUser } from "@/@types/general";
import { createUser } from "@/app/[lang]/_api/createUser";
import { getUser } from "@/app/[lang]/_api/getUser";
import { auth, db } from "@/firebase";
import { AuthContext } from "@/providers/AuthProvider";
import { User, deleteUser, onAuthStateChanged } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

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
        await deleteDoc(userDoc);
        await deleteUser(user);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function controlUnverifiedUser() {
    try {
      setLoadingUser(true);
      if (
        !pathname.includes("sign-up") &&
        auth.currentUser &&
        !auth.currentUser.emailVerified
      ) {
        await handleUserDelete(auth.currentUser);
      }

      if (auth.currentUser == null) {
        return setCurrentUser(null);
      }

      // checkUser(auth.currentUser.email);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    controlUnverifiedUser();
    if (auth.currentUser != null && currentUser == null) {
      getCurrentUser(auth.currentUser?.email!);
    }
  }, [auth.currentUser, pathname]);

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
        handleUserDelete,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
