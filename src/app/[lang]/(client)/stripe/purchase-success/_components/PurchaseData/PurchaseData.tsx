"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { buyProduct } from "@/app/[lang]/_api/buyProduct";
import { formatCurrency } from "@/lib/formatters";
import { useAuthProvider } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";

interface PurchaseDataProps {
  product: TProduct;
  isSuccess: boolean;
  lang: TLocale;
}

export function PurchaseData({ product, isSuccess, lang }: PurchaseDataProps) {
  const translations = useDictionary();
  const { currentUser } = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && currentUser) {
      buyProduct(product, currentUser);
    }
  }, [isSuccess, currentUser]);

  if (auth.currentUser == null && currentUser == null) {
    router.replace("/");
    return;
  }

  const encodedEmail = encodeURIComponent(currentUser?.email || "");

  return (
    <div className="flex gap-4 items-center">
      <div className="aspect-video flex-shrink-0 w-1/3 relative">
        <Image
          src={product.imagePath}
          fill
          alt={product.name}
          className="object-cover"
        />
      </div>
      <div>
        <div className="text-lg">
          {formatCurrency(product.priceInCents / 100)}
        </div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="line-clamp-3 text-muted-foreground">
          {product.description}
        </div>
        <button className="mt-4">
          {isSuccess ? (
            <a
              download
              href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
            >
              {translations.page.download}
            </a>
          ) : (
            <Link href={`/products/${product.id}/buy`}>Try Again</Link>
          )}
        </button>
      </div>
    </div>
  );
}
