"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { useDictionary } from "@/hooks/useDictionary";
import Image from "next/image";
import { CollectionCardDropdown } from "@/app/[lang]/(client)/profile/_components/Collection/CollectionCard/CollectionCardDropdown";
import { DualButton } from "@/app/[lang]/_components/DualButton";

interface CollectionCardProps {
  product: TProduct;
  lang: TLocale;
  encodedEmail: string;
}

export function CollectionCard({
  product,
  lang,
  encodedEmail,
}: CollectionCardProps) {
  const translations = useDictionary();

  return (
    <div
      key={product.id}
      className="flex flex-col justify-between min-h-[14rem]"
    >
      <div>
        <div className="min-w-20 lg:min-w-40 aspect-video relative">
          <Image
            objectFit="cover"
            src={product.imagePath}
            fill
            alt={`Image of ${product.name}`}
          />
        </div>
        <h2 className="font-semibold text-xl my-2">{product.name}</h2>
        <div className="line-clamp-3 text-gray-700 dark:text-gray-300">
          {product.description}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4 items-end">
        <CollectionCardDropdown product={product} />
        <DualButton size="asChild">
          <a
            className="min-w-full min-h-full px-2 py-1"
            download
            href={`/${lang}/products/${product.id}/download?email=${encodedEmail}`}
          >
            {translations.page.download}
          </a>
        </DualButton>
      </div>
    </div>
  );
}
