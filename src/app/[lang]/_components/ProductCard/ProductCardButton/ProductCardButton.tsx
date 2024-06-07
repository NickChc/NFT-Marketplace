"use client";

import { TProduct } from "@/@types/general";
import { useAuthProvider } from "@/providers/AuthProvider";
import Link from "next/link";
import { TLocale } from "../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";

interface ProductCardButtonProps {
  product: TProduct;
  lang: TLocale;
}

export function ProductCardButton({ product, lang }: ProductCardButtonProps) {
  const { currentUser } = useAuthProvider();
  const translations = useDictionary();

  const encodedEmail = currentUser ? encodeURIComponent(currentUser.email) : "";

  return (
    <button
      disabled={product.owner?.isFrozen}
      className="bg-purple-800 text-white w-full mt-4 rounded-md hover:opacity-75 duration-100 disabled:cursor-default disabled:opacity-50 disabled:px-2 disabled:py-1 flex justify-center"
    >
      {product.owner ? (
        product.owner.userId === currentUser?.id ? (
          <a
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
          >
            {translations.page.download}
          </a>
        ) : product.owner.isFrozen ? (
          translations.page.notAvailable
        ) : (
          <Link
            href={
              currentUser
                ? `/${lang}/products/${product.id}/bid`
                : `/${lang}/auth/sign-in`
            }
            className="min-w-full min-h-full px-2 py-1 rounded-md"
          >
            {translations.page.bid}
          </Link>
        )
      ) : (
        <Link
          href={
            currentUser
              ? `/${lang}/products/${product.id}/buy`
              : `/${lang}/auth/sign-in`
          }
          className="min-w-full min-h-full px-2 py-1 rounded-md"
        >
          {translations.page.buy}
        </Link>
      )}
    </button>
  );
}
