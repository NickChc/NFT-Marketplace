import { TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { TLocale } from "../../../../../i18n.config";
import Link from "next/link";

interface ProductCardProps {
  product: TProduct;
  lang: TLocale;
  text: {
    price: string;
    buy: string;
    bid: string;
    owner: string;
  };
}

export async function ProductCard({ product, lang, text }: ProductCardProps) {
  return (
    <div>
      <div className="relative aspect-video">
        <Image
          src={product.imagePath}
          alt={`${product.name} image`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-2xl font-semibold my-1">{product.name}</h3>
      <p className="line-clamp-3 min-h-14">{product.description}</p>
      <div className="min-h-12">
        <h4 className="text-gray-500 font-semibold text-xl">
          {text.price} - {formatCurrency(product.priceInCents / 100)}
        </h4>
        {product.owner && <h4 className="">{text.owner} - {product.owner.fullName}</h4>}
      </div>

      <button className="bg-purple-800 text-white px-2 py-1 w-full mt-4 rounded-md hover:opacity-75 duration-100">
        {product.owner ? (
          <Link href={`/${lang}/products/${product.id}/bid`}>{text.bid}</Link>
        ) : (
          <Link href={`/${lang}/products/${product.id}/buy`}>{text.buy}</Link>
        )}
      </button>
    </div>
  );
}
