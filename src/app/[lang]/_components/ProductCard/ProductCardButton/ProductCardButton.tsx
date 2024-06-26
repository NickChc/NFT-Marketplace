"use client";

import { TLocale } from "../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { useAuthProvider } from "@/providers/AuthProvider";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { DualButton } from "../../DualButton";

interface ProductCardButtonProps {
  product: TProduct;
  lang: TLocale;
}

export function ProductCardButton({ product, lang }: ProductCardButtonProps) {
  const { currentUser } = useAuthProvider();
  const { setOfferItem } = useGlobalProvider();
  const translations = useDictionary();

  const encodedEmail = currentUser ? encodeURIComponent(currentUser.email) : "";

  function handleClick() {
    if (product.owner?.isFrozen) return;

    setOfferItem(product);
  }

  if (
    (product.owner?.isFrozen || product.openForBidding) &&
    product.owner?.userId !== currentUser?.id
  ) {
    return (
      <DualButton onClick={handleClick} disabled={product.owner?.isFrozen}>
        {product.owner?.isFrozen
          ? translations.page.notAvailable
          : translations.page.bid}
      </DualButton>
    );
  } else {
    return (
      <DualButton size="asChild" disabled={product.owner?.isFrozen}>
        {product.owner?.userId === currentUser?.id ? (
          <a
            className="min-w-full min-h-full px-2 py-1 rounded-md"
            href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
          >
            {translations.page.download}
          </a>
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
      </DualButton>
    );
  }
}
