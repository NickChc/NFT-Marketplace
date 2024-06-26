"use client";

import { TLocale } from "../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/assets/icons";

interface ProductViewMoreProps {
  lang: TLocale;
}

export function ProductViewMore({ lang }: ProductViewMoreProps) {
  const [image, setImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("image");

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
        router.push(`/${lang}/`);
      }}
    >
      <div className="w-1/2 bg-white py-6 relative">
        <span className="hover:opacity-75 text-xl text-purple-800 cursor-pointer absolute top-1 right-1 z-50">
          <CloseIcon />
        </span>
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="relative aspect-video w-full pt-4"
        >
          <Image src={image} alt="Image for NFT" fill objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
