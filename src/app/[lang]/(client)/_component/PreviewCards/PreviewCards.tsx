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
      <div className="mt-3 sm:mt-9 flex flex-row items-center xs:gap-x-3 sm:gap-x-5 overflow-hidden ">
        <h2 className="min-w-fit text-base xs:text-lg sm:text-2xl font-semibold truncate pb-1 ml-2">
          {title}
        </h2>
        <hr className="rotate-90 w-10 h-[1px] my-2 border-black shrink-0 dark:border-custom-white" />
        <Link
          href={href || `/${lang}/products`}
          className="flex items-center gap-x-4 text-base xs:text-lg sm:text-2xl font-semibold ml-2 group whitespace-nowrap"
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
