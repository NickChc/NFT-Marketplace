import { TOrder } from "@/@types/general";
import { salesCollectionRef } from "@/firebase";
import { getDocs } from "firebase/firestore";


export async function getOrders() {
  try {
    const data = await getDocs(salesCollectionRef);
    const orders = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return orders as TOrder[];
  } catch (error: any) {
    console.log(error.message);
  }
}