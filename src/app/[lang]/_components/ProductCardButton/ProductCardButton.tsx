"use client";

import { TLocale } from "../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { useAuthProvider } from "@/providers/AuthProvider";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useEffect, useState } from "react";
import { DownloadIcon, ExchangeIcon, PayIcon } from "@/assets/icons";

interface ProductCardButtonProps {
  product: TProduct;
  lang: TLocale;
  onClick?: () => void;
}

export function ProductCardButton({
  product,
  lang,
  onClick,
}: ProductCardButtonProps) {
  const [isCurrentUsers, setIsCurrentUsers] = useState(false);
  const { currentUser } = useAuthProvider();
  const { setOfferItem } = useGlobalProvider();
  const translations = useDictionary();
  const { page } = translations;
  const encodedEmail = currentUser ? encodeURIComponent(currentUser.email) : "";

  function handleClick() {
    if (product.owner?.isFrozen || currentUser == null) return;

    if (onClick) {
      onClick();
    }

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
    return <DualButton>{page.notAvailable.toLocaleUpperCase()}</DualButton>;
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
            <div className="inline-flex items-center gap-x-3">
              {page.download.toLocaleUpperCase()}
              <DownloadIcon className="text-xl" />
            </div>
          </a>
        ) : currentUser == null ? (
          <Link
            className="min-w-full min-h-full px-2 py-1 rounded-md whitespace-nowrap "
            href={`/${lang}/auth/sign-in?offerAfter=${product.id}`}
          >
            <div className="inline-flex items-center gap-x-4">
              {page.bid.toLocaleUpperCase()}
              <ExchangeIcon className="text-2xl" />
            </div>
          </Link>
        ) : (
          <div className="inline-flex items-center gap-x-4">
            {page.bid.toLocaleUpperCase()}
            <ExchangeIcon className="text-xl" />
          </div>
        )}
      </DualButton>
    );
  } else {
    return (
      <DualButton
        disabled={!product.isAvailable && !isCurrentUsers}
        size={product.isAvailable ? "asChild" : undefined}
      >
        {isCurrentUsers ? (
          <a
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
          >
            <div className="inline-flex items-center gap-x-3">
              {page.download.toLocaleUpperCase()}
              <DownloadIcon className="text-xl" />
            </div>
          </a>
        ) : product.isAvailable ? (
          <Link
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={
              currentUser
                ? `/${lang}/products/${product.id}/buy`
                : `/${lang}/auth/sign-in?purchase=${product.id}`
            }
          >
            <div className="inline-flex items-center gap-x-4">
              {page.buy.toLocaleUpperCase()}
              <PayIcon className="text-xl" />
            </div>
          </Link>
        ) : (
          page.notAvailable.toLocaleUpperCase()
        )}
      </DualButton>
    );
  }
}
