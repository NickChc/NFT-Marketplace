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
    .join("&");

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
        className={`bg-white w-[95%] xs:w-[90%] md:w-[80%] xl:max-w-[900px] 2xl:max-w-[1100px] py-6 relative border-solid border border-purple-700 rounded-md max-h-[90vh] ${
          zoom ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"
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
          {zoom && (
            <div className="sm:w-1/2 md:w-1/3 aspect-video sm:aspect-square pt-4 duration-200 transition-all z-50 w-[90vw] max-h-[90vh]"></div>
          )}
          <div
            className={`sm:aspect-square pt-4 z-50 w-[90vw] max-h-[90vh] ${
              zoom
                ? "cursor-zoom-out min-w-[50vw] fixed top-1/2 -translate-y-1/2 aspect-square duration-200 transition-all"
                : "relative cursor-zoom-in sm:w-1/2 md:w-1/3 aspect-video "
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
              className={zoom ? "" : ""}
            />
          </div>
          <div className="flex flex-col items-start justify-between w-full mt-3 sm:mt-0 sm:w-1/2 ">
            <div className="flex flex-col min-h-40">
              <h2 className="font-semibold mb-3 text-xl sm:text-2xl">
                {product.name}
              </h2>
              <p className="max-h-32 lg:max-h-40 overflow-auto pr-1 scrollbar-small my-3">
                {product.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                illum voluptatibus deserunt optio, tempore quaerat! Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Culpa, provident. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Maiores, omnis.
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
