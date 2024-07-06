import { TLocale } from "../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getDictionaries } from "@/lib/dictionary";
import Link from "next/link";
import { ProductsTable } from "@/app/[lang]/admin/_components/Table";
import { PlusIcon } from "@/assets/icons";

interface AdminProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function AdminProductsPage({
  params: { lang },
}: AdminProductsPageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col mx-auto min-h-[50dvh] ">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PageHeader>{page.products}</PageHeader>
        <button className="rounded-md bg-purple-800 dark:bg-white dark:text-black text-white  font-semibold whitespace-nowrap text-xs sm:text-sm">
          <Link
            className="flex items-center gap-x-3  px-2 py-1 rounded-md"
            href={`/${lang}/admin/products/new`}
          >
            {page.addProduct} <PlusIcon className="text-xl font-semibold" />
          </Link>
        </button>
      </div>

      <ProductsTable lang={lang} />
    </div>
  );
}
