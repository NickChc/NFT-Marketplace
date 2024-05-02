import { TProduct } from "@/@types/general";
import { productCollectionRef } from "@/firebase";
import { getDocs } from "firebase/firestore";


export async function getProducts() {
  try {
    const data = await getDocs(productCollectionRef);
    const products = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return products as TProduct[];
  } catch (error: any) {
    console.log(error.message);
  }
}