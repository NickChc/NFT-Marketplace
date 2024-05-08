import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { notFound } from "next/navigation";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase";

interface GETProps {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params: { id } }: GETProps) {
  const product = await getProduct(id);

  if (product == null) return notFound();

  const decodedFileUrl = decodeURIComponent(product.filePath);
  const filePathStartIndex = decodedFileUrl.lastIndexOf("/") + 1;
  const filePathEndIndex = decodedFileUrl.indexOf("?");
  const file = decodedFileUrl.substring(
    filePathStartIndex,
    filePathEndIndex !== -1 ? filePathEndIndex : undefined
  );

  const fileRef = ref(storage, `NFT's/${file}`);

  const downloadURL = await getDownloadURL(fileRef);

  const fileRes = await fetch(downloadURL);

  if (!fileRes.ok) {
    throw new Error("Failed to fetch the file!");
  }

  const fileBuffer = await fileRes.arrayBuffer();

  const extension = product.filePath.split(".").pop()?.split("?")?.[0];
  console.log(extension);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${product.name.replace(
        /\s/g,
        "_"
      )}${extension}"`,
      "Content-Length": fileBuffer.byteLength.toString(),
    },
  });
}
