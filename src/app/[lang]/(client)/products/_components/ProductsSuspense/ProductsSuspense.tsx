import { TLocale } from "../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { getDictionaries } from "@/lib/dictionary";
import { TFilterBy_Enum } from "@/app/[lang]/(client)/products/_components/FilterProducts";
import { QuestionMarkIcon } from "@/assets/icons";

interface ProductsSuspenseProps {
  lang: TLocale;
  productsFetcher: () => Promise<TProduct[] | undefined>;
  query?: TFilterBy_Enum;
  priceRange?: [number, number] | null;
}

export async function ProductSuspense({
  productsFetcher,
  lang,
  priceRange,
}: ProductsSuspenseProps) {
  const { page } = await getDictionaries(lang);

  const products = await productsFetcher();

  if (products == null || products.length < 1) {
    return (
      <div className="text-gray-400 flex flex-col sm:flex-row items-center gap-x-3 sm:absolute right-1/2 sm:translate-x-1/2 top-1/3 gap-y-3 ">
        <QuestionMarkIcon className="text-7xl md:text-9xl " />
        <h2 className="text-4xl md:text-6xl font-semibold">
          {page.noProducts}
        </h2>
      </div>
    );
  }

  if (priceRange) {
    const [min, max] = priceRange;

    return products
      .filter((product) => {
        const price = product.priceInCents / 100;
        if (price < max && price > min) {
          return product;
        }
      })
      .map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            text={{ ...page }}
            lang={lang}
          />
        );
      });
  } else {
    return products.map((product) => {
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
}
