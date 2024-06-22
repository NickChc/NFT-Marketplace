import { TProduct } from "@/@types/general";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { TLocale } from "../../../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";

interface ProductsSuspenseProps {
  lang: TLocale;
  productsFetcher: () => Promise<TProduct[] | undefined>;
}

export async function ProductSuspense({
  productsFetcher,
  lang,
}: ProductsSuspenseProps) {
  const { page } = await getDictionaries(lang);

  const allProducts = await productsFetcher();

  const products = allProducts?.filter((product) => {
    if (product.isAvailable || product.openForBidding) {
      return product;
    }
  });

  return products?.map((product) => {
    if (product.isAvailable || product.openForBidding) {
      return (
        <ProductCard
          key={product.id}
          product={product}
          text={{ ...page }}
          lang={lang}
        />
      );
    }
  });
}
