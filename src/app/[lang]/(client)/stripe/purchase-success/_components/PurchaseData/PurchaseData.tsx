"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { buyProduct } from "@/app/[lang]/_api/buyProduct";
import { formatCurrency } from "@/lib/formatters";
import { useAuthProvider } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDictionary } from "@/hooks/useDictionary";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { blurDataImage } from "@/config/general";

interface PurchaseDataProps {
  product: TProduct;
  isSuccess: boolean;
  lang: TLocale;
}

export function PurchaseData({ product, isSuccess, lang }: PurchaseDataProps) {
  const hasPurchased = useRef(false);
  const translations = useDictionary();
  const { currentUser } = useAuthProvider();
  const encodedEmail = encodeURIComponent(currentUser?.email || "");

  useEffect(() => {
    if (!isSuccess || currentUser == null || hasPurchased.current) return;

    buyProduct(product, currentUser);
    hasPurchased.current = true;
  }, [currentUser, product, isSuccess]);

  return (
    <>
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold px-3 py-6 sm:py-9 mx-auto max-w-7xl">
        {isSuccess && translations.page.congratulations} {product.name}
      </h4>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch  p-3 mt-4 mx-auto max-w-7xl">
        <div className="aspect-video flex-shrink-0 w-full sm:w-1/2 relative max-w-[700px]">
          <Image
            placeholder="blur"
            blurDataURL={blurDataImage}
            onError={(e) => {
              console.log("Failed to load image", e);
              e.currentTarget.src =
                "../../../../../assets/images/PlaceholderImg.webp";
            }}
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="w-full flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="line-clamp-5 text-muted-foreground">
              {product.description}
            </div>
          </div>
          <div>
            <div className="text-lg md:text-2xl xl:text-4xl pb-4 sm:mb-0">
              {formatCurrency(product.priceInCents / 100)}
            </div>
            <DualButton size="asChild">
              {isSuccess ? (
                <a
                  className="w-full h-full p-2"
                  download
                  href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
                >
                  {translations.page.download.toLocaleUpperCase()}
                </a>
              ) : (
                <Link
                  className="w-full h-full p-2"
                  href={`/products/${product.id}/buy`}
                >
                  {translations.page.tryAgain.toLocaleUpperCase()}
                </Link>
              )}
            </DualButton>
          </div>
        </div>
      </div>
    </>
  );
}
