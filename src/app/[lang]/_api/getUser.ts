import { TUser } from "@/@types/general";
import { usersCollectionRef } from "@/firebase";
import { getDocs, query, where } from "firebase/firestore";

export async function getUser(email: string) {
  try {
    const data = await getDocs(
      query(usersCollectionRef, where("email", "==", email))
    );
    const doc = data.docs[0];
    const currentUser = { ...doc.data(), id: doc.id };
    return currentUser as TUser;
  } catch (error: any) {
  }
}
