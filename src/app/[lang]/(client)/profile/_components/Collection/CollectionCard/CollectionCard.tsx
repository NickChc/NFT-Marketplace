"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { useDictionary } from "@/hooks/useDictionary";
import Image from "next/image";
import { CollectionCardDropdown } from "@/app/[lang]/(client)/profile/_components/Collection/CollectionCard/CollectionCardDropdown";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { blurDataImage } from "@/config/general";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const withoutImageParams = searchParams
    .toString()
    .split("&")
    .filter((param) => param.split("=")[0] !== "image")
    .join();

  return (
    <div
      key={product.id}
      className="flex flex-col justify-between min-h-[14rem]"
    >
      <div>
        <Link
          href={`${pathname}${
            withoutImageParams !== "" ? `?${withoutImageParams}&` : "?"
          }image=${product.id}`}
        >
          <div className="relative aspect-video after:duration-300 after:content-[''] after:block after:w-0 [@media(hover:hover){&:hover}]:after:w-full after:h-[90%] after:border-solid after:border-2 after:border-purple-400 after:border-x-0 after:absolute after:top-1/2 after:right-1/2 after:-translate-y-1/2 after:translate-x-1/2 before:duration-300 before:content-[''] before:block before:h-0 [@media(hover:hover){&:hover}]:before:h-full before:w-[90%] before:border-2 before:border-solid before:border-purple-400 before:border-y-0 before:absolute before:top-1/2 before:right-1/2 before:translate-x-1/2 before:-translate-y-1/2 before:z-50 cursor-pointer active:brightness-75">
            <Image
              placeholder="blur"
              blurDataURL={blurDataImage}
              onError={(e) => {
                console.log("Failed to load image", e);
                e.currentTarget.src =
                  "../../../../../assets/images/PlaceholderImg.webp";
              }}
              src={product.imagePath}
              alt={`${product.name} image`}
              fill
              className="object-cover duration-200"
            />
          </div>
        </Link>
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
