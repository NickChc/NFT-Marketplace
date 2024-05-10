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
    owner: undefined,
    isAvailable: false,
    createdAt: Timestamp.fromDate(new Date()) as any,
  };

  await addDoc(productCollectionRef, newProduct);
  redirect("/en/admin/products");
}

export async function deleteProduct(product: TProduct) {
  const productDoc = doc(db, "product", product.id);

  await Promise.all([
    deleteFile(product.filePath),
    deleteImage(product.imagePath),
    deleteDoc(productDoc),
  ]);
}

async function deleteFile(filePath: string) {
  const decodedFileUrl = decodeURIComponent(filePath);
  const filePathStartIndex = decodedFileUrl.lastIndexOf("/") + 1;
  const filePathEndIndex = decodedFileUrl.indexOf("?");
  const file = decodedFileUrl.substring(
    filePathStartIndex,
    filePathEndIndex !== -1 ? filePathEndIndex : undefined
  );


  const fileRef = ref(storage, `NFT's/${file}`);

  await deleteObject(fileRef);
}

async function deleteImage(imagePath: string) {
  const decodedImageUrl = decodeURIComponent(imagePath);
  const imagePathStartIndex = decodedImageUrl.lastIndexOf("/") + 1;
  const imagePathEndIndex = decodedImageUrl.indexOf("?");
  const image = decodedImageUrl.substring(
    imagePathStartIndex,
    imagePathEndIndex !== -1 ? imagePathEndIndex : undefined
  );

  const imageRef = ref(storage, `NFT's/${image}`);

  await deleteObject(imageRef);
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
    await deleteFile(product.filePath);

    const fileRef = ref(storage, `NFT's/${randomUUID()}_${data.filePath.name}`);

    await uploadBytes(fileRef, await data.filePath.arrayBuffer());

    filePath = await getDownloadURL(fileRef);
  }

  let imagePath = product.imagePath;
  if (data.imagePath != null && data.imagePath.size > 0) {
    await deleteImage(product.imagePath);

    const imageRef = ref(
      storage,
      `NFT's/${randomUUID()}_${data.imagePath.name}`
    );

    await uploadBytes(imageRef, await data.imagePath.arrayBuffer());

    imagePath = await getDownloadURL(imageRef);
  }

  const compareObjects =
    data.name === product.name &&
    data.description === product.description &&
    data.priceInCents === product.priceInCents;

  if (
    filePath === product.filePath &&
    imagePath === product.imagePath &&
    compareObjects
  ) {
    return redirect("/admin/products");
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
