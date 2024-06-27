import { TLocale } from "../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { getDictionaries } from "@/lib/dictionary";
import { TFilterBy_Enum } from "../FilterProducts/FilterProducts";

interface ProductsSuspenseProps {
  lang: TLocale;
  productsFetcher: () => Promise<TProduct[] | undefined>;
  query?: "all" | "forSale" | "forBidding";
}

export async function ProductSuspense({
  productsFetcher,
  lang,
  query,
}: ProductsSuspenseProps) {
  const { page } = await getDictionaries(lang);

  const allProducts = await productsFetcher();

  const products = allProducts?.filter((product) => {
    if (!product.isAvailable && !product.openForBidding) return;

    if (query === "all" || query == null) {
      return product;
    } else {
      if (product.owner?.isFrozen) return;

      return product;
    }
  });

  return products?.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        text={{ ...page }}
        lang={lang}
      />
    );
  });
}
