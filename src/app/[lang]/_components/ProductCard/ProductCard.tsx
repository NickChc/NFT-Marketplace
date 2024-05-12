import { TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

interface ProductCardProps {
  product: TProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <div className="relative aspect-video">
        <Image src={product.imagePath} alt={`${product.name} image`} fill className="object-cover" />
      </div>
      <h3>{product.name}</h3>
      <h4>{formatCurrency(product.priceInCents / 100)}</h4>
      <p>{product.description}</p>
    </div>
  );
}
