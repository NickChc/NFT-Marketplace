import { getProducts } from "@/app/[lang]/_api/getProducts";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { TLocale } from "../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";

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

      <div className="flex gap-x-4 mt-9">
        {newest?.map((product) => {
          return (
            <div key={product.id} className="flex flex-col p-3">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-4"></div>
    </div>
  );
}
