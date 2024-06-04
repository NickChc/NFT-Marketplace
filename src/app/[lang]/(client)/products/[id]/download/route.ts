import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { notFound, redirect } from "next/navigation";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase";
import { getUser } from "@/app/[lang]/_api/getUser";

interface GETProps {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: GETProps) {
  const url = new URL(req.url);

  const encodedEmail = url.searchParams.get("email");
  const decodedEmail = encodedEmail ? decodeURIComponent(encodedEmail) : "";

  const [product, user] = await Promise.all([
    getProduct(params.id),
    getUser(decodedEmail),
  ]);

  if (product == null) return notFound();

  if (user == null || product.owner?.userId !== user.id) {
    return redirect("/");
  }

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

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${product.name.replace(
        /\s/g,
        "_"
      )}.${extension}"`,
      "Content-Length": fileBuffer.byteLength.toString(),
    },
  });
}
