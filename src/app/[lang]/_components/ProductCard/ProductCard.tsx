import { TLocale } from "../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { ProductCardButton } from "@/app/[lang]/_components/ProductCard/ProductCardButton";
import Link from "next/link";

interface ProductCardProps {
  product: TProduct;
  lang: TLocale;
  text: {
    price: string;
    buy: string;
    bid: string;
    owner: string;
    notAvailable: string;
    paid: string;
  };
}

export async function ProductCard({ product, lang, text }: ProductCardProps) {
  return (
    <div className="p-2">
      <Link href={`/${lang}/?image=${product.id}`}>
        <div className="relative group aspect-video after:duration-300 after:content-[''] after:block after:w-0 hover:after:w-full after:h-[90%] after:border-solid after:border after:border-white after:border-x-0 after:absolute after:top-1/2 after:right-1/2 after:-translate-y-1/2 after:translate-x-1/2 before:duration-300 before:content-[''] before:block before:h-0 hover:before:h-full before:w-[90%] before:border before:border-solid before:border-white before:border-y-0 before:absolute before:top-1/2 before:right-1/2 before:translate-x-1/2 before:-translate-y-1/2 before:z-50 cursor-pointer">
          <Image
            src={product.imagePath}
            alt={`${product.name} image`}
            fill
            className="object-cover group-hover:brightness-75 duration-200"
          />
        </div>
      </Link>
      <h3 className="text-2xl md:text-xl lg:text-2xl font-semibold my-1 truncate">
        {product.name}
      </h3>
      <p className="line-clamp-3 min-h-12 sm:min-h-20 mt-2">
        {product.description}
      </p>
      <div className="min-h-16 flex flex-col gap-3 my-3 sm:block">
        <h4 className="text-gray-500 font-semibold text-xl md:text-lg lg:text-xl">
          {product.openForBidding
            ? `${text.paid} - ${formatCurrency(
                product.owner?.paidInCents! / 100
              )}`
            : `${text.price} - ${formatCurrency(product.priceInCents / 100)}`}
        </h4>
        {product.owner && (
          <h4 className="truncate">
            {text.owner} - {product.owner.fullName}
          </h4>
        )}
      </div>

      <ProductCardButton product={product} lang={lang} />
    </div>
  );
}
