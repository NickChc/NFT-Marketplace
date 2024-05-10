"use server";

import { TUser } from "@/@types/general";
import { db } from "@/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function toggleFreeze(user: TUser, isFrozen: boolean) {
  const userDoc = doc(db, "users", user.id);
  await updateDoc(userDoc, { ...user, isFrozen });
}

export async function deleteUser(user: TUser) {
  if (user.ownings.length > 0) return;

  const userDoc = doc(db, "users", user.id);

  await deleteDoc(userDoc);
}
