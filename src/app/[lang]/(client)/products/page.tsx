import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";

interface ProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function ProductsPage({
  params: { lang },
}: ProductsPageProps) {
  const [{ page }, allProducts] = await Promise.all([
    getDictionaries(lang),
    getProducts(),
  ]);

  const products = allProducts?.filter((product) => {
    if (product.isAvailable || product.openForBidding) {
      return product;
    }
  });

  return (
    <div className="container xl:w-[90%] xl:mx-auto pb-9 min-h-dvh">
      <PageHeader>{page.products}</PageHeader>
      <div className="p-1 gap-x-3 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-14">
        {products?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              text={{ ...page }}
              lang={lang}
            />
          );
        })}
      </div>
    </div>
  );
}
