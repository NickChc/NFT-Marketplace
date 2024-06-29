"use client";

import { TProduct } from "@/@types/general";
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
      href={`${pathname}${
        withoutImageParams !== "" ? `?${withoutImageParams}&` : "?"
      }image=${product.id}`}
    >
      <div className="relative group aspect-video after:duration-300 after:content-[''] after:block after:w-0 hover:after:w-full after:h-[90%] after:border-solid after:border-2 after:border-white after:border-x-0 after:absolute after:top-1/2 after:right-1/2 after:-translate-y-1/2 after:translate-x-1/2 before:duration-300 before:content-[''] before:block before:h-0 hover:before:h-full before:w-[90%] before:border-2 before:border-solid before:border-white before:border-y-0 before:absolute before:top-1/2 before:right-1/2 before:translate-x-1/2 before:-translate-y-1/2 before:z-50 cursor-pointer">
        <Image
          src={product.imagePath}
          alt={`${product.name} image`}
          fill
          className="object-cover group-hover:brightness-75 duration-200"
        />
      </div>
    </Link>
  );
}
