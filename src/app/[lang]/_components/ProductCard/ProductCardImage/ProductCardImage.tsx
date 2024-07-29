"use client";

import { TProduct } from "@/@types/general";
import { blurDataImage } from "@/config/general";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface ProductCardImageProps {
  product: TProduct;
}

export function ProductCardImage({ product }: ProductCardImageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const withoutImageParams = searchParams
    .toString()
    .split("&")
    .filter((param) => param.split("=")[0] !== "image")
    .join();

  return (
    <Link
      scroll={false}
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
            e.currentTarget.src = blurDataImage;
          }}
          src={product.imagePath}
          alt={`${product.name} image`}
          fill
          className="object-cover duration-200"
        />
      </div>
    </Link>
  );
}
