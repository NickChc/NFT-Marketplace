import { TUser } from "@/@types/general";
import { usersCollectionRef } from "@/firebase";
import { getDocs } from "firebase/firestore";



export async function getUsers() {
  try {
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return users as TUser[];
  } catch (error: any) {
    console.log(error.message);
  }
}