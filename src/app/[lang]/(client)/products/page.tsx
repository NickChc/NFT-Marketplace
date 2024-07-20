import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { Suspense } from "react";
import { ProductSuspense } from "@/app/[lang]/(client)/products/_components/ProductsSuspense";
import { ProductSkeleton } from "@/app/[lang]/(client)/_component/ProductSkeleton";
import { TProduct } from "@/@types/general";
import { FilterProducts } from "@/app/[lang]/(client)/products/_components/FilterProducts";
import { TFilterBy_Enum } from "./_components/FilterProducts/FilterProducts";

interface ProductsPageProps {
  params: {
    lang: TLocale;
  };
  searchParams: {
    filterBy: string;
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { page } = await getDictionaries(params.lang);

  const filter = searchParams.filterBy;
  const query = filter ? (filter as TFilterBy_Enum) : ("all" as TFilterBy_Enum);

  async function productsFetcher(): Promise<TProduct[] | undefined> {
    if (filter === "forBidding") {
      return await getProducts(
        undefined,
        undefined,
        undefined,
        undefined,
        true
      );
    } else if (filter === "forSale") {
      return await getProducts(undefined, true);
    } else {
      return await getProducts();
    }
  }

  return (
    <div className="container mx-auto xl:w-[90%] xl:mx-auto">
      <PageHeader>{page.products}</PageHeader>
      <div className=" pb-9 min-h-dvh flex flex-col items-center">
        <div className="w-full flex flex-col items-start pt-4">
          <FilterProducts />
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
              query={query}
              productsFetcher={productsFetcher}
              lang={params.lang}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
