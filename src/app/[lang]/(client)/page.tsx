import { TLocale } from "../../../../i18n.config";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getDictionaries } from "@/lib/dictionary";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { RightArrowIcon } from "@/assets/icons";
import Link from "next/link";

interface AdminProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function HomePage({
  params: { lang },
}: AdminProductsPageProps) {
  const { page } = await getDictionaries(lang);
  const [newest, withoutOwner, forBidding] = await Promise.all([
    getProducts(3, true),
    getProducts(undefined, false, true),
    getProducts(3, false, false, undefined, true),
  ]);

  return (
    <div className="mx-auto flex flex-col w-full sm:w-[90%] md:w-[80%] pb-4 sm:py-9">
      <PageHeader>{page.homeCap}</PageHeader>
      <div className="mt-3 sm:mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-x-3 sm:gap-x-14">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold ml-2">
          {page.newest}
        </h2>
        <hr className="w-full sm:hidden my-2" />
        <Link
          href={`/${lang}/products`}
          className="flex items-center gap-x-4 text-lg sm:text-2xl md:text-3xl font-semibold ml-2 group whitespace-nowrap"
        >
          {page.viewAll}
          <span className="duration-200 group-hover:ml-4">
            <RightArrowIcon />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9 mx-auto">
        {newest?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              text={{ ...page }}
            />
          );
        })}
      </div>

      {forBidding && forBidding.length > 0 && (
        <>
          <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-x-3 sm:gap-x-14">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold ml-2">
              {page.forBidding}
            </h2>
            <hr className="w-full sm:hidden my-2" />

            <Link
              href={`/${lang}/products`}
              className="flex items-center gap-x-4 text-lg sm:text-2xl md:text-3xl font-semibold ml-2 group whitespace-nowrap"
            >
              {page.viewAll}
              <span className="duration-200 group-hover:ml-4">
                <RightArrowIcon />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9">
            {forBidding?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  text={{ ...page }}
                />
              );
            })}
          </div>
        </>
      )}
      <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-x-3 sm:gap-x-14">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold ml-2">
          {page.forSale}
        </h2>
        <hr className="w-full sm:hidden my-2" />
        <Link
          href={`/${lang}/products`}
          className="flex items-center gap-x-4 text-lg sm:text-2xl md:text-3xl font-semibold ml-2 group whitespace-nowrap"
        >
          {page.viewAll}
          <span className="duration-200 group-hover:ml-4">
            <RightArrowIcon />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9">
        {withoutOwner?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              text={{ ...page }}
            />
          );
        })}
      </div>
    </div>
  );
}
