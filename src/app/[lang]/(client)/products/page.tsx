import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { Suspense } from "react";
import { ProductSuspense } from "@/app/[lang]/(client)/products/_components/ProductsSuspense";
import { ProductSkeleton } from "@/app/[lang]/(client)/_component/ProductSkeleton";
import { TProduct } from "@/@types/general";
import { FilterProducts } from "@/app/[lang]/(client)/products/_components/FilterProducts";
import { PriceFilter } from "@/app/[lang]/(client)/products/_components/PriceFilter";

interface ProductsPageProps {
  params: {
    lang: TLocale;
  };
  searchParams: {
    filterBy: string;
    min: string;
    max: string;
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { page } = await getDictionaries(params.lang);

  const { min, max, filterBy: filter } = searchParams;

  async function productsFetcher(): Promise<TProduct[] | undefined> {
    const priceRange: [number, number] | undefined =
      min && max ? [Number(min), Number(max)] : undefined;

    if (filter === "forBidding") {
      return await getProducts(
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        priceRange
      );
    } else if (filter === "forSale") {
      return await getProducts(
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        priceRange
      );
    } else {
      return await getProducts(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        priceRange
      );
    }
  }

  return (
    <div className="mx-auto xl:w-[90%] xl:mx-auto pb-9 sm:pb-20">
      <PageHeader>{page.products}</PageHeader>
      <div className="pb-9 min-h-dvh flex flex-col items-center">
        <div className="w-full flex flex-col items-start sm:flex-row sm:justify-between gap-x-3 gap-y-6 pt-4 px-3 sm:px-6 mt-1">
          <FilterProducts />
          <PriceFilter />
        </div>
        <div className="p-1 gap-x-3 gap-y-6 sm:gap-y-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-14 w-full">
          <Suspense
            fallback={
              <>
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </>
            }
          >
            <ProductSuspense
              productsFetcher={productsFetcher}
              lang={params.lang}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
