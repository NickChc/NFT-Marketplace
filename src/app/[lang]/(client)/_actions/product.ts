"use server";

import { TProduct } from "@/@types/general";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getUser } from "@/app/[lang]/_api/getUser";
import { revalidatePath } from "next/cache";
import { updateUserNotes } from "@/app/[lang]/_api/updateUserNotes";

export async function returnProduct(product: TProduct, email: string) {
  const user = await getUser(email);

  if (user == null || user.isFrozen) return;

  const userDoc = doc(db, "users", user.id);
  const productDoc = doc(db, "product", product.id);

  const newOwnings = user.ownings.filter(
    (item) => item.productId !== product.id
  );

  await updateDoc(userDoc, {
    ownings: newOwnings,
    offers: user.offers.filter((off) => off.productId !== product.id),
  });

  await Promise.all([
    updateDoc(productDoc, {
      isAvailable: true,
      owner: null,
      priceInCents: product.originalPriceInCents,
      openForBidding: false,
    }),
    updateUserNotes(user, product.id),
  ]);

  revalidatePath(`/*`);
}

export async function sellProduct(
  priceInCents: number,
  product: TProduct,
  email: string
) {
  const productDoc = doc(db, "product", product.id);

  const user = await getUser(email);

  if (user == null || user.isFrozen) return;

  const userDoc = doc(db, "users", user?.id);

  await Promise.all([
    updateDoc(productDoc, {
      priceInCents,
      isAvailable: true,
      openForBidding: false,
    }),
    updateUserNotes(user, product.id),
    updateDoc(userDoc, {
      offers: user.offers.filter((off) => off.productId !== product.id),
    }),
  ]);

  revalidatePath("/*");
}

export async function stopSelling(product: TProduct, email: string) {
  const productDoc = doc(db, "product", product.id);

  const user = await getUser(email);

  if (user == null || user.isFrozen) return;

  return await updateDoc(productDoc, {
    isAvailable: false,
    priceInCents: product.originalPriceInCents,
  });
}

export async function toggleBidding(product: TProduct, email: string) {
  const productDoc = doc(db, "product", product.id);

  const user = await getUser(email);

  if (user == null || user.isFrozen) return;

  const userDoc = doc(db, "users", user.id);

  let promises = [];
  if (product.openForBidding) {
    promises.push(updateUserNotes(user, product.id));
  }

  promises.push(
    updateDoc(productDoc, {
      isAvailable: false,
      openForBidding: !product.openForBidding,
    }),
    updateDoc(userDoc, {
      offers: user.offers.filter((offer) => offer.productId !== product.id),
    })
  );

  await Promise.all(promises);
}
