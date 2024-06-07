"use server";

import { TProduct, TUser } from "@/@types/general";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getUser } from "../../_api/getUser";

export async function returnProduct(product: TProduct, email: string) {
  const user = await getUser(email);

  if (user == null) return;

  const userDoc = doc(db, "users", user.id);
  const productDoc = doc(db, "product", product.id);

  const newOwnings = user.ownings.filter(
    (item) => item.productId !== product.id
  );

  return await Promise.all([
    updateDoc(userDoc, {
      ownings: newOwnings,
    }),
    updateDoc(productDoc, {
      isAvailable: true,
      owner: null,
    }),
  ]);
}
