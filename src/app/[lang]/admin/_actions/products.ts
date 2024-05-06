"use server";

import { TProduct } from "@/@types/general";
import { db, storage } from "@/firebase";
import {
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { productCollectionRef } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { randomUUID } from "crypto";
import { z } from "zod";
import { File } from "buffer";
import { notFound, redirect } from "next/navigation";
import firebase from "firebase/compat/app";
import { getProduct } from "@/app/[lang]/_api/getProduct";

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

const fileSchema = z.instanceof(File, { message: "Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  filePath: fileSchema.refine((file) => file.size > 0, "Required"),
  imagePath: fileSchema.refine((file) => file.size > 0, "Required"),
});

export async function createProduct(prevState: unknown, formData: FormData) {
  const result = createSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const { name, description, priceInCents, filePath, imagePath } = data;

  const fileRef = ref(storage, `NFT's/${randomUUID()}_${filePath.name}`);
  const imageRef = ref(storage, `NFT's/${randomUUID()}_${imagePath.name}`);
  await Promise.all([
    uploadBytes(fileRef, await filePath.arrayBuffer()),
    uploadBytes(imageRef, await imagePath.arrayBuffer()),
  ]);

  const [fileURL, imageURL] = await Promise.all([
    getDownloadURL(fileRef),
    getDownloadURL(imageRef),
  ]);

  const newProduct: Omit<TProduct, "id"> = {
    name,
    description,
    priceInCents,
    filePath: fileURL,
    imagePath: imageURL,
    orders: 0,
    isAvailable: false,
    createdAt: Timestamp.fromDate(new Date()) as any,
  };

  await addDoc(productCollectionRef, newProduct);
  redirect("/en/admin/products");
}

export async function deleteProduct(product: TProduct) {
  const productDoc = doc(db, "product", product.id);

  const decodedFileUrl = decodeURIComponent(product.filePath);
  const filePathStartIndex = decodedFileUrl.lastIndexOf("/") + 1;
  const filePathEndIndex = decodedFileUrl.indexOf("?");
  const file = decodedFileUrl.substring(
    filePathStartIndex,
    filePathEndIndex !== -1 ? filePathEndIndex : undefined
  );

  const decodedImageUrl = decodeURIComponent(product.imagePath);
  const imagePathStartIndex = decodedImageUrl.lastIndexOf("/") + 1;
  const imagePathEndIndex = decodedImageUrl.indexOf("?");
  const image = decodedImageUrl.substring(
    imagePathStartIndex,
    imagePathEndIndex !== -1 ? imagePathEndIndex : undefined
  );

  const fileRef = ref(storage, `NFT's/${file}`);
  const imageRef = ref(storage, `NFT's/${image}`);

  await Promise.all([
    deleteObject(fileRef),
    deleteObject(imageRef),
    deleteDoc(productDoc),
  ]);
}

const editSchema = createSchema.extend({
  filePath: fileSchema.optional(),
  imagePath: imageSchema.optional(),
});

export async function editProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  const product = await getProduct(id);

  if (product == null) return notFound();

  let filePath = product.filePath;
  if (data.filePath != null && data.filePath.size > 0) {
    const decodedFileUrl = decodeURIComponent(product.filePath);
    const filePathStartIndex = decodedFileUrl.lastIndexOf("/") + 1;
    const filePathEndIndex = decodedFileUrl.indexOf("?");
    const file = decodedFileUrl.substring(
      filePathStartIndex,
      filePathEndIndex !== -1 ? filePathEndIndex : undefined
    );
    const fileRef = ref(storage, `NFT's/${randomUUID()}_${file}`);
    await Promise.all([
      uploadBytes(fileRef, await data.filePath.arrayBuffer()),
      deleteObject(fileRef),
    ]);

    filePath = await getDownloadURL(fileRef);
  }

  let imagePath = product.imagePath;
  if (data.imagePath != null && data.imagePath.size > 0) {
    const decodedImageUrl = decodeURIComponent(product.imagePath);
    const imagePathStartIndex = decodedImageUrl.lastIndexOf("/") + 1;
    const imagePathEndIndex = decodedImageUrl.indexOf("?");
    const image = decodedImageUrl.substring(
      imagePathStartIndex,
      imagePathEndIndex !== -1 ? imagePathEndIndex : undefined
    );

    const imageRef = ref(storage, `NFT's/${randomUUID()}_${image}`);

    await Promise.all([
      uploadBytes(imageRef, await data.imagePath.arrayBuffer()),
      deleteObject(imageRef),
    ]);

    imagePath = await getDownloadURL(imageRef);
  }

  const productDoc = doc(db, "product", id);

  await updateDoc(productDoc, {
    name: data.name,
    description: data.description,
    isAvailable: product.isAvailable,
    priceInCents: data.priceInCents,
    filePath,
    imagePath,
  });

  redirect("/admin/products");
}
