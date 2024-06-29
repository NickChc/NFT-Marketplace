"use client";

import { TLocale } from "../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/assets/icons";

export function ProductViewMore() {
  const [image, setImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const productId = searchParams.get("image");

  const withoutImageParam = searchParams
    .toString()
    .split("&")
    .filter((param) => param.split("=")[0] !== "image")
    .join();

  async function getImagePath(productId: string) {
    try {
      const product = await getProduct(productId);
      if (product) {
        setImage(product.imagePath);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (productId == null) return setImage(null);
    getImagePath(productId);
  }, [searchParams]);

  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [image]);

  if (image == null) return null;

  return (
    <div
      className="fixed min-h-dvh top-0 bottom-0 right-0 left-0 z-50 grid place-items-center backdrop-blur-sm
      "
      onMouseDown={() => {
        if (withoutImageParam !== "") {
          router.push(`${pathname}?${withoutImageParam}`);
        } else {
          router.push(`${pathname}/?`);
        }
      }}
    >
      <div
        className="w-1/2 bg-white py-6 relative"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span
          className="hover:opacity-75 text-xl text-purple-800 cursor-pointer absolute top-1 right-1 z-50"
          onClick={() => {
            if (withoutImageParam !== "") {
              router.push(`${pathname}?${withoutImageParam}`);
            } else {
              router.push(`${pathname}/?`);
            }
          }}
        >
          <CloseIcon />
        </span>
        <div className="relative aspect-video w-full pt-4">
          <Image src={image} alt="Image for NFT" fill objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
