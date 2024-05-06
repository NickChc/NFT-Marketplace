import { TProduct } from "@/@types/general";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getProduct(id: string) {
  try {
    const productRef = doc(db, "product", id);

    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      const product = docSnap.data();
      const createdAt = product.createdAt.toDate();
      return { ...product, createdAt, id: docSnap.id } as TProduct;
    } else {
      throw new Error("No Such Document Found!");
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
