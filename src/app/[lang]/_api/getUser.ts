import { TUser } from "@/@types/general";
import { usersCollectionRef } from "@/firebase";
import { getDocs, query, where } from "firebase/firestore";

export async function getUser(email?: string, uid?: string) {
  try {
    let data;
    if (email) {
      data = await getDocs(
        query(usersCollectionRef, where("email", "==", email))
      );
    } else if (uid) {
      data = await getDocs(query(usersCollectionRef, where("uid", "==", uid)));
    } else {
      return null;
    }
    const doc = data.docs[0];
    const currentUser = { ...doc.data(), id: doc.id };
    return currentUser as TUser;
  } catch (error: any) {}
}
