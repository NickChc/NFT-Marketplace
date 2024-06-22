import { TLocale } from "../../../../i18n.config";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getDictionaries } from "@/lib/dictionary";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { RightArrowIcon } from "@/assets/icons";
import Link from "next/link";
import { PreviewCards } from "./_component/PreviewCards";
import { Suspense } from "react";
import { PreviewCardsSuspense } from "./_component/PreviewCardsSuspense";
import { PreviewCardsSkeleton } from "./_component/PreviewCards/PreviewCardsSkeleton";

interface AdminProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function HomePage({
  params: { lang },
}: AdminProductsPageProps) {
  const { page } = await getDictionaries(lang);

  async function promiseResolve() {
    return Promise.all([
      getProducts(3, true),
      getProducts(undefined, false, true),
      getProducts(3, false, false, undefined, true),
    ]);
  }

  return (
    <div className="mx-auto flex flex-col w-full sm:w-[90%] md:w-[80%] pb-4 sm:py-9">
      <PageHeader>{page.homeCap}</PageHeader>

      <Suspense
        fallback={
          <>
            <PreviewCardsSkeleton />
            <PreviewCardsSkeleton />
            <PreviewCardsSkeleton />
          </>
        }
      >
        <PreviewCardsSuspense productsFetcher={promiseResolve} lang={lang} />
      </Suspense>
    </div>
  );
}
