import { TLocale } from "../../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import Link from "next/link";
import { RightArrowIcon } from "@/assets/icons";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";
import { TProduct } from "@/@types/general";

interface PreviewCardsProps {
  lang: TLocale;
  products: TProduct[] | undefined;
  title: string;
  href?: string;
}

export async function PreviewCards({
  lang,
  products,
  title,
  href,
}: PreviewCardsProps) {
  const { page } = await getDictionaries(lang);

  if (products == null || products.length < 1) return null;

  return (
    <>
      <div className="mt-3 sm:mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-x-3 sm:gap-x-14">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold ml-2">
          {title}
        </h2>
        <hr className="w-full sm:hidden my-2 bg-black dark:bg-custom-white" />
        <Link
          href={href || `/${lang}/products`}
          className="flex items-center gap-x-4 text-lg sm:text-2xl md:text-3xl font-semibold ml-2 group whitespace-nowrap"
        >
          {page.viewAll}
          <span className="duration-200 group-hover:ml-4">
            <RightArrowIcon />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-9 mx-auto">
        {products.map((product) => {
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
  );
}
