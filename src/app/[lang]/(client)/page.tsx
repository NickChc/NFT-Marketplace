import { TLocale } from "../../../../i18n.config";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getDictionaries } from "@/lib/dictionary";
import { ProductCard } from "@/app/[lang]/_components/ProductCard";

interface AdminProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function HomePage({
  params: { lang },
}: AdminProductsPageProps) {
  const { page } = await getDictionaries(lang);
  const [newest, withoutOwner] = await Promise.all([
    getProducts(3, true),
    getProducts(undefined, false, true),
  ]);

  const { price, buy, bid, owner } = page;

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col mx-auto py-9">
      <PageHeader>{page.home}</PageHeader>

      <div className="mt-9">
        <h2 className="text-3xl font-semibold ml-2">{page.newest}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9">
        {newest?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              text={{ price, buy, bid, owner }}
            />
          );
        })}
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-semibold ml-2">{page.forSale}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9">
        {withoutOwner?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              text={{ price, buy, bid, owner }}
            />
          );
        })}
      </div>
    </div>
  );
}
