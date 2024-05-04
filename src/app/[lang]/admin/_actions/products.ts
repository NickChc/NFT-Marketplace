"use server";

import { TProduct } from "@/@types/general";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function toggleAvailability(
  product: TProduct,
  isAvailable: boolean
) {
  try {
    const productDoc = doc(db, "product", product.id);
    await updateDoc(productDoc, { ...product, isAvailable });
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function createProduct(productData: any) {
  try {
    console.log(productData);
  } catch (error: any) {
    console.log(error.message);
  }
}
