"use client";

import { TLocale } from "../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { useAuthProvider } from "@/providers/AuthProvider";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useEffect, useState } from "react";

interface ProductCardButtonProps {
  product: TProduct;
  lang: TLocale;
}

export function ProductCardButton({ product, lang }: ProductCardButtonProps) {
  const [isCurrentUsers, setIsCurrentUsers] = useState(false);
  const { currentUser } = useAuthProvider();
  const { setOfferItem } = useGlobalProvider();
  const translations = useDictionary();
  const { page } = translations;
  const encodedEmail = currentUser ? encodeURIComponent(currentUser.email) : "";

  function handleClick() {
    if (product.owner?.isFrozen || currentUser == null) return;

    setOfferItem(product);
  }

  useEffect(() => {
    if (currentUser == null || product.owner == null) {
      setIsCurrentUsers(false);
      return;
    }

    setIsCurrentUsers(currentUser.id === product.owner.userId);
  }, [currentUser, product]);

  if (product.owner?.isFrozen) {
    return <DualButton>{page.notAvailable}</DualButton>;
  } else if (product.openForBidding) {
    return (
      <DualButton
        size={isCurrentUsers || currentUser == null ? "asChild" : undefined}
        onClick={handleClick}
      >
        {isCurrentUsers ? (
          <a
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
          >
            {page.download}
          </a>
        ) : currentUser == null ? (
          <Link
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={`/${lang}/auth/sign-in`}
          >
            {page.bid}
          </Link>
        ) : (
          page.bid
        )}
      </DualButton>
    );
  } else {
    return (
      <DualButton
        disabled={!product.isAvailable}
        size={product.isAvailable ? "asChild" : undefined}
      >
        {isCurrentUsers ? (
          <a
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
          >
            {page.download}
          </a>
        ) : product.isAvailable ? (
          <Link
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={
              currentUser
                ? `/${lang}/products/${product.id}/buy`
                : `/${lang}/auth/sign-in`
            }
          >
            {page.buy}
          </Link>
        ) : (
          page.notAvailable
        )}
      </DualButton>
    );
  }
}
