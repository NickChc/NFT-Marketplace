"use client";

import { TLocale } from "../../../../../../i18n.config";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/assets/icons";
import { TProduct } from "@/@types/general";
import { ProductCardButton } from "@/app/[lang]/_components/ProductCardButton";
import { formatCurrency } from "@/lib/formatters";
import { useDictionary } from "@/hooks/useDictionary";

interface ProductViewMoreProps {
  lang: TLocale;
}

export function ProductViewMore({ lang }: ProductViewMoreProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [zoom, setZoom] = useState<boolean>(false);
  const [product, setProduct] = useState<TProduct | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const productId = searchParams.get("image");
  const translations = useDictionary();

  const withoutImageParam = searchParams
    .toString()
    .split("&")
    .filter((param) => param.split("=")[0] !== "image")
    .join();

  function closeModal() {
    setZoom(false);
    if (withoutImageParam !== "") {
      router.push(`${pathname}?${withoutImageParam}`, { scroll: false });
    } else {
      router.push(`${pathname}/?`, { scroll: false });
    }
  }

  async function getImagePath(productId: string) {
    try {
      const product = await getProduct(productId);
      if (product) {
        setProduct(product);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (productId == null) return setProduct(null);
    getImagePath(productId);
  }, [searchParams]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      setMounted(true);
    } else {
      document.body.style.overflow = "auto";
      setMounted(false);
    }
  }, [product]);

  if (product == null) return null;

  return (
    <div
      className={`fixed min-h-dvh top-0 bottom-0 right-0 left-0 z-50 text-black place-items-center backdrop-blur-sm transition-display duration-300 start-style-b-t ${
        mounted ? "grid" : "hidden"
      }`}
      onMouseDown={closeModal}
    >
      <div
        className="w-[80%] sm:w-[70%] bg-white py-6 relative border-solid border border-purple-700 rounded-md"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span
          className="hover:opacity-75 text-xl text-purple-800 cursor-pointer absolute top-1 right-1 z-50"
          onClick={closeModal}
        >
          <CloseIcon />
        </span>
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-x-3 p-3">
          <div
            className={`relative aspect-video pt-4 overflow-hidden w-full md:w-1/2 duration-200 z-50 ${
              zoom
                ? "cursor-zoom-out scale-125 md:scale-150 translate-y-10 md:translate-y-0 md:translate-x-1/2"
                : "cursor-zoom-in"
            } `}
            onClick={() => setZoom(!zoom)}
          >
            <Image
              src={product.imagePath}
              alt="Image for NFT"
              fill
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col items-start justify-between w-full mt-3 md:mt-0 md:w-1/2 ">
            <div className="flex flex-col min-h-40">
              <h2 className="font-semibold mb-1 text-xl md:text-2xl">
                {product.name}
              </h2>
              <p className="max-h-28 overflow-auto pr-1 scrollbar-small ">
                {product.description}
              </p>
            </div>
            <strong className="text-xl my-1">
              {translations.page.price} -{" "}
              {formatCurrency(product.priceInCents / 100)}
            </strong>
            <ProductCardButton product={product} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
