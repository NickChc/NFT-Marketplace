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
  const newest = await getProducts(3, true);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col mx-auto">
      <PageHeader>{page.home}</PageHeader>

      <h2 className="text-3xl font-semibold">Newest</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9">
        {newest?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <div className="flex gap-x-4"></div>
    </div>
  );
}
