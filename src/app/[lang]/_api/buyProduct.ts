import { TProduct, TUser } from "@/@types/general";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, salesCollectionRef } from "@/firebase";

export async function buyProduct(product: TProduct, currentUser: TUser) {
  try {
    const userDoc = doc(db, "users", currentUser.id);
    const productDoc = doc(db, "product", product.id);
    const { name, surname, email } = currentUser;
    const fullName = name !== "" ? `${name} ${surname}` : email;

    if (currentUser.ownings.map((o) => o.productId).includes(product.id)) {
      return;
    }

    await Promise.all([
      updateDoc(userDoc, {
        ...currentUser,
        spentInCents: currentUser.spentInCents + product.priceInCents,
        ownings: [
          ...currentUser.ownings,
          {
            paidInCents: product.priceInCents,
            productId: product.id,
            productName: product.name,
          },
        ],
      }),
      updateDoc(productDoc, {
        ...product,
        owner: {
          fullName,
          isFrozen: currentUser.isFrozen,
          userId: currentUser.id,
          paidInCents: product.priceInCents,
        },
        isAvailable: false,
        orders: product.orders + 1,
      }),
      addDoc(salesCollectionRef, {
        paidInCents: product.priceInCents,
        productId: product.id,
      }),
    ]);
  } catch (error: any) {
    console.log(error.message);
  }
}
