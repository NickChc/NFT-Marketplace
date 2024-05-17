import { TProduct } from "@/@types/general";
import { productCollectionRef } from "@/firebase";
import { getDocs, orderBy, query, limit, where } from "firebase/firestore";

export async function getProducts(
  limitAt?: number,
  activeOnly?: boolean,
  withoutOwner?: boolean,
  userId?: string
) {
  try {
    let data;
    if (limitAt && activeOnly) {
      data = await getDocs(
        query(
          productCollectionRef,
          where("isAvailable", "==", true),
          orderBy("createdAt", "desc"),
          limit(limitAt)
        )
      );
    } else if (activeOnly) {
      data = await getDocs(
        query(
          productCollectionRef,
          where("isAvailable", "==", true),
          orderBy("createdAt", "desc")
        )
      );
    } else if (withoutOwner) {
      data = await getDocs(
        query(
          productCollectionRef,
          where("owner", "==", null),
          orderBy("createdAt", "desc")
        )
      );
    } else if (userId) {
      data = await getDocs(
        query(
          productCollectionRef,
          where("owner.userId", "==", userId),
          orderBy("createdAt", "desc")
        )
      );
    } else {
      data = await getDocs(productCollectionRef);
    }
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
