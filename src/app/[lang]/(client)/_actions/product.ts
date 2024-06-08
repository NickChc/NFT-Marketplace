"use server";

import { TProduct, TUser } from "@/@types/general";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getUser } from "@/app/[lang]/_api/getUser";

export async function returnProduct(product: TProduct, email: string) {
  const user = await getUser(email);

  if (user == null) return;

  const userDoc = doc(db, "users", user.id);
  const productDoc = doc(db, "product", product.id);

  const newOwnings = user.ownings.filter(
    (item) => item.productId !== product.id
  );

  const originalPrice =
    user.ownings.find((item) => item.productId === product.id)?.paidInCents ||
    product.priceInCents;

  return await Promise.all([
    updateDoc(userDoc, {
      ownings: newOwnings,
    }),
    updateDoc(productDoc, {
      isAvailable: true,
      owner: null,
      priceInCents: originalPrice,
    }),
  ]);
}

export async function sellProduct(
  priceInCents: number,
  product: TProduct,
  email: string
) {
  const productDoc = doc(db, "product", product.id);

  const user = await getUser(email);

  if (product.owner?.userId !== user?.id) return;

  return await updateDoc(productDoc, {
    priceInCents,
    isAvailable: true,
  });
}

export async function stopSelling(product: TProduct, email: string) {
  const productDoc = doc(db, "product", product.id);

  const user = await getUser(email);

  if (user == null) return;

  const originalPrice =
    user.ownings.find((item) => item.productId === product.id)?.paidInCents ||
    product.priceInCents;

  return await updateDoc(productDoc, {
    isAvailable: false,
    priceInCents: originalPrice,
  });
}
