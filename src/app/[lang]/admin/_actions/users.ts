"use server";

import { TUser } from "@/@types/general";
import { db } from "@/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import firebaseAdmin from "@/firebaseAdmin";


export async function toggleFreeze(user: TUser, isFrozen: boolean) {
  let promises: any[] = [];

  const userDoc = doc(db, "users", user.id);
  promises.push(updateDoc(userDoc, { ...user, isFrozen }));

  const userProducts = await getProducts(
    undefined,
    undefined,
    undefined,
    user.id
  );

  if (userProducts?.length! > 0) {
    userProducts?.forEach((product) => {
      const productDoc = doc(db, "product", product.id);
      promises.push(
        updateDoc(productDoc, {
          ...product,
          owner: { ...product.owner, isFrozen },
        })
      );
    });
  }

  await Promise.all(promises);
}

export async function deleteUser(user: TUser) {
  if (user.ownings.length > 0) return;

  const userDoc = doc(db, "users", user.id);

  const userId = user.uid;

  await Promise.all([
    firebaseAdmin.auth().deleteUser(user.uid),
    deleteDoc(userDoc)
  ])
}
