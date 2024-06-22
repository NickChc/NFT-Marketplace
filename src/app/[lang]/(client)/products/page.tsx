import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { Suspense } from "react";
import { ProductSuspense } from "@/app/[lang]/(client)/products/_components/ProductsSuspense";
import { ProductSkeleton } from "@/app/[lang]/(client)/_component/ProductSkeleton";
import { TProduct } from "@/@types/general";

interface ProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function ProductsPage({
  params: { lang },
}: ProductsPageProps) {
  const { page } = await getDictionaries(lang);

  async function wait(dur: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, dur);
    });
  }

  async function productsFetcher(): Promise<TProduct[] | undefined> {
    return await getProducts();
  }

  return (
    <div className="container xl:w-[90%] xl:mx-auto pb-9 min-h-dvh">
      <PageHeader>{page.products}</PageHeader>
      <div className="p-1 gap-x-3 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-14">
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
          <ProductSuspense productsFetcher={productsFetcher} lang={lang} />
        </Suspense>
      </div>
    </div>
  );
}
