import { TLocale } from "../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { ProductCardButton } from "@/app/[lang]/_components/ProductCard/ProductCardButton";

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
      <div className="relative aspect-video">
        <Image
          src={product.imagePath}
          alt={`${product.name} image`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-2xl md:text-xl lg:text-2xl font-semibold my-1 truncate">
        {product.name}
      </h3>
      <p className="line-clamp-3 min-h-12 sm:min-h-20 mt-2">
        {product.description}
      </p>
      <div className="min-h-16 flex flex-col gap-3 mt-3 sm:block">
        <h4 className="text-gray-500 font-semibold text-xl md:text-lg lg:text-xl">
          {product.openForBidding
            ? `${text.paid} - ${formatCurrency(
                product.owner?.paidInCents! / 100
              )}`
            : `${text.price} - ${formatCurrency(product.priceInCents / 100)}`}
        </h4>
        {product.owner && (
          <h4 className="">
            {text.owner} - {product.owner.fullName}
          </h4>
        )}
      </div>

      <ProductCardButton product={product} lang={lang} />
    </div>
  );
}
