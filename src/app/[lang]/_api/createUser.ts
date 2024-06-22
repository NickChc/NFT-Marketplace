import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, usersCollectionRef } from "@/firebase";
import { TUser } from "@/@types/general";
import { getUser } from "@/app/[lang]/_api/getUser";

export async function createUser(newUser: Omit<TUser, "id">) {
  try {
    const user = await getUser(newUser.email);
    if (user) {
      const userDoc = doc(db, "users", user.id);
      return await updateDoc(userDoc, {
        ...user,
        name: newUser.name,
        surname: newUser.surname,
        uid: newUser.uid,
      });
    } else {
      return await addDoc(usersCollectionRef, newUser);
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
