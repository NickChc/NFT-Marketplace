import { TProduct } from "@/@types/general";
import { productCollectionRef } from "@/firebase";
import { getDocs, orderBy, query, limit, where, and } from "firebase/firestore";

export async function getProducts(
  limitAt?: number,
  activeOnly?: boolean,
  withoutOwner?: boolean,
  userId?: string,
  forBidding?: boolean,
  priceRange?: [number, number]
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
          and(
            where("isAvailable", "==", true),
            where("priceInCents", "<", (priceRange?.[1] || Infinity) * 100),
            where("priceInCents", ">", priceRange ? priceRange[0] * 100 : 0)
          ),
          orderBy("createdAt", "desc")
        )
      );
    } else if (withoutOwner) {
      data = await getDocs(
        query(
          productCollectionRef,
          and(
            where("owner", "==", null),
            where("priceInCents", "<", (priceRange?.[1] || Infinity) * 100),
            where("priceInCents", ">", priceRange ? priceRange[0] * 100 : 0)
          ),
          orderBy("createdAt", "desc")
        )
      );
    } else if (userId) {
      data = await getDocs(
        query(
          productCollectionRef,
          and(
            where("owner.userId", "==", userId),
            where("priceInCents", "<", (priceRange?.[1] || Infinity) * 100),
            where("priceInCents", ">", priceRange ? priceRange[0] * 100 : 0)
          ),
          orderBy("createdAt", "desc")
        )
      );
    } else if (forBidding && limitAt) {
      data = await getDocs(
        query(
          productCollectionRef,
          and(
            where("openForBidding", "==", true),
            where("priceInCents", "<", (priceRange?.[1] || Infinity) * 100),
            where("priceInCents", ">", priceRange ? priceRange[0] * 100 : 0)
          ),
          orderBy("createdAt", "desc"),
          limit(limitAt)
        )
      );
    } else if (forBidding) {
      data = await getDocs(
        query(
          productCollectionRef,
          and(
            where("openForBidding", "==", true),
            where("priceInCents", "<", (priceRange?.[1] || Infinity) * 100),
            where("priceInCents", ">", priceRange ? priceRange[0] * 100 : 0)
          ),
          orderBy("createdAt", "desc")
        )
      );
    } else if (priceRange) {
      data = await getDocs(
        query(
          productCollectionRef,
          and(
            where("priceInCents", "<", (priceRange?.[1] || Infinity) * 100),
            where("priceInCents", ">", priceRange ? priceRange[0] * 100 : 0)
          ),
          orderBy("priceInCents", "asc")
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
