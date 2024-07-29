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
import { blurDataImage } from "@/config/general";

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
      className={`fixed min-h-dvh top-0 bottom-0 right-0 left-0 z-50 text-black flex-col items-center sm:place-items-center sm: py-6 backdrop-blur-custom transition-display duration-300 start-style-b-t ${
        mounted ? "flex sm:grid" : "hidden"
      }`}
      onMouseDown={closeModal}
    >
      {zoom && (
        <div
          className="fixed min-h-dvh top-0 bottom-0 right-0 left-0 z-50 bg-transparent backdrop-blur-custom"
          onMouseDown={(e) => {
            e.stopPropagation();
            setZoom(false);
          }}
        ></div>
      )}
      <div
        className={`w-[95%] xs:w-[90%] min-h-fit bg-white py-6 relative border-solid border border-purple-700 rounded-md ${
          zoom ? "" : "overflow-y-visible overflow-x-hidden"
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span
          className="hover:opacity-75 text-2xl text-purple-800 cursor-pointer absolute top-1 right-1 z-50"
          onClick={closeModal}
        >
          <CloseIcon />
        </span>
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-x-3 pt-3 px-3">
          <div
            className={`relative aspect-video pt-4 w-full sm:w-1/2 duration-200 z-50 ${
              zoom
                ? "cursor-zoom-out scale-125 sm:scale-150 translate-y-10 sm:translate-y-0 sm:translate-x-1/2"
                : "cursor-zoom-in"
            } `}
            onClick={() => setZoom(!zoom)}
          >
            <Image
              placeholder="blur"
              blurDataURL={blurDataImage}
              onError={(e) => {
                console.log("Failed to load image", e);
                e.currentTarget.src =
                  "../../../../../assets/images/PlaceholderImg.webp";
              }}
              src={product.imagePath}
              alt="Image for NFT"
              fill
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col items-start justify-between w-full mt-3 sm:mt-0 sm:w-1/2 ">
            <div className="flex flex-col min-h-40">
              <h2 className="font-semibold mb-3 text-xl sm:text-2xl">
                {product.name}
              </h2>
              <p className="max-h-28 overflow-auto pr-1 scrollbar-small my-3">
                {product.description}
              </p>
            </div>
            <div className="flex flex-col items-stretch w-full">
              <strong className="text-xl mt-1 mb-4">
                {translations.page.price} -{" "}
                {formatCurrency(product.priceInCents / 100)}
              </strong>
              <ProductCardButton
                product={product}
                lang={lang}
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
