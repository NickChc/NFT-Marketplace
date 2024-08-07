import { TLocale } from "../../../i18n.config";
import { PropsWithChildren, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TUser } from "@/@types/general";
import { createUser } from "@/app/[lang]/_api/createUser";
import { getUser } from "@/app/[lang]/_api/getUser";
import { auth, db } from "@/firebase";
import { AuthContext } from "@/providers/AuthProvider";
import {
  GoogleAuthProvider,
  User,
  deleteUser,
  onAuthStateChanged,
  onIdTokenChanged,
  reauthenticateWithPopup,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { PROVIDER } from "@/config/storageKeys";

interface AuthProviderprops {
  lang: TLocale;
}

export function AuthProvider({
  children,
  lang,
}: PropsWithChildren<AuthProviderprops>) {
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authProvider, setAuthProvider] = useState<
    "google" | "password" | undefined
  >(undefined);

  const pathname = usePathname();
  const router = useRouter();

  async function getCurrentUser(email?: string, uid?: string) {
    try {
      let currUser;
      if (email) {
        currUser = await getUser(email);
      } else if (uid) {
        currUser = await getUser(undefined, uid);
      }
      setCurrentUser(currUser ? currUser : null);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function checkUser(uid: string, email?: string | null) {
    try {
      setLoadingUser(true);
      if (email == null) return;

      const user = await getUser(undefined, uid);

      if (user) {
        if (user.email !== email) {
          const userDoc = doc(db, "users", user.id);

          await updateDoc(userDoc, {
            email,
          });
          getCurrentUser(email);
        }
        return setCurrentUser(user);
      } else {
        const provider = localStorage.getItem(PROVIDER);
        if (provider == null || provider !== "google") return;

        const newUser: Omit<TUser, "id"> = {
          uid,
          name: "",
          surname: "",
          email,
          spentInCents: 0,
          ownings: [],
          offers: [],
          isFrozen: false,
        };

        await createUser(newUser);
        getCurrentUser(email);
        localStorage.removeItem(PROVIDER);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingUser(false);
    }
  }

  async function handleUserDelete(
    user: User | null,
    callback?: () => void,
    onError?: (error: string) => void,
    stay?: boolean
  ) {
    try {
      if (user == null || user.email == null) return;

      const userToDelete = await getUser(user.email);

      if (userToDelete && userToDelete.ownings.length > 0) return;

      if (userToDelete == null) {
        return await deleteUser(user);
      } else {
        const userDoc = doc(db, "users", userToDelete.id);
        await deleteUser(user);
        await deleteDoc(userDoc);
      }
      if (callback) {
        callback();
      }
      await handleLogOut();

      if (stay) return;

      router.replace(`/${lang}/auth/sign-in`);
    } catch (error: any) {
      console.log(error.message);
      if (onError) {
        onError(error.message);
      }
    }
  }

  async function reauthenticate(user: User | null, blank?: boolean) {
    if (user == null) return;

    if (user.providerData.some((data) => data.providerId === "password")) {
      setAuthProvider("password");
    } else if (user.providerData[0].providerId === "google.com") {
      setAuthProvider("google");
      if (blank) return true;
      try {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
        return true;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    } else {
      setAuthProvider(undefined);
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

      if (auth.currentUser == null && currentUser != null) {
        return setCurrentUser(null);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingUser(false);
    }
  }

  async function handleLogOut() {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function setCookie(user: User | null) {
    if (user) {
      const token = await user.getIdToken();
      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      document.cookie = `auth=${token}; expires=${expiryDate}; path=/`;
    } else {
      const expiryDate = new Date(0);
      document.cookie = `auth=; expires=${expiryDate}; path=/`;
    }
  }

  useEffect(() => {
    controlUnverifiedUser();
    if (auth.currentUser == null) {
      setCurrentUser(null);
    }
    if (
      auth.currentUser != null &&
      auth.currentUser.email != null &&
      currentUser == null
    ) {
      getCurrentUser(auth.currentUser.email);
    }
  }, [auth.currentUser, pathname, loading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        checkUser(user.uid, user.email);
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setCookie(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loadingUser,
        handleUserDelete,
        handleLogOut,
        getCurrentUser,
        authProvider,
        setAuthProvider,
        reauthenticate,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
