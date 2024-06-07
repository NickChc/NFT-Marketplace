"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { buyProduct } from "@/app/[lang]/_api/buyProduct";
import { formatCurrency } from "@/lib/formatters";
import { useAuthProvider } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { auth } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";

interface PurchaseDataProps {
  product: TProduct;
  isSuccess: boolean;
  lang: TLocale;
}

export function PurchaseData({ product, isSuccess, lang }: PurchaseDataProps) {
  const hasPurchased = useRef(false);
  const translations = useDictionary();
  const { currentUser } = useAuthProvider();
  const router = useRouter();

  const encodedEmail = encodeURIComponent(currentUser?.email || "");

  useEffect(() => {
    if (!isSuccess || currentUser == null || hasPurchased.current) return;

    buyProduct(product, currentUser);
    hasPurchased.current = true;
  }, [currentUser, product, isSuccess]);

  if (auth.currentUser == null && currentUser == null) {
    router.replace("/");
  }

  return (
    <>
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold px-3 my-4 sm:my-6">
        {isSuccess && translations.page.congratulations} {product.name}
      </h4>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch  p-3 mt-4 mx-auto max-w-7xl">
        <div className="aspect-video flex-shrink-0 w-full sm:w-1/2 md:w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="w-full flex flex-col justify-between">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-5 text-muted-foreground">
            {product.description}
          </div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <button className="font-semibold bg-purple-800 rounded-sm p-2 hover:opacity-75 duration-100 disabled:cursor-default disabled:opacity-50 mt-6 w-full">
            {isSuccess ? (
              <a
                download
                href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
              >
                {translations.page.download}
              </a>
            ) : (
              <Link href={`/products/${product.id}/buy`}>
                {translations.page.tryAgain}
              </Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
