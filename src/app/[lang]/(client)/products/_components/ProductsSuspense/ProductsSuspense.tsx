import { TLocale } from "../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { getDictionaries } from "@/lib/dictionary";
import { TFilterBy_Enum } from "../FilterProducts/FilterProducts";
import { QuestionMarkIcon } from "@/assets/icons";

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

  if (products == null || products.length < 1) {
    return (
      <div className="flex flex-col items-center fixed right-1/2 translate-x-1/2 top-1/4 gap-y-3 ">
        <QuestionMarkIcon className="text-7xl text-gray-300" />
        <h2 className="text-4xl">No products available</h2>
      </div>
    );
  }

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
