import { TProduct } from "@/@types/general";
import { productCollectionRef } from "@/firebase";
import { getDocs } from "firebase/firestore";

export async function getProducts() {
  try {
    const data = await getDocs(productCollectionRef);
    const products = data.docs.map((doc) => {
      const productData = doc.data();
      const createdAt = productData.createdAt.toDate();
      return { ...productData, id: doc.id, createdAt };
    });
    return products as TProduct[];
  } catch (error: any) {
    console.log(error.message);
  }
}
