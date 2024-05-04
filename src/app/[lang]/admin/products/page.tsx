import { getProducts } from "@/app/[lang]/_api/getProducts";
import { PageHeader } from "../../_components/PageHeader";
import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import Link from "next/link";
import { ProductsTable } from "@/app/[lang]/admin/_components/Table";

interface AdminProductsPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function AdminProductsPage({
  params: { lang },
}: AdminProductsPageProps) {
  const { page } = await getDictionaries(lang);
  const products = await getProducts();

  const newest = products
    ? products
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 3)
    : [];

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PageHeader>{page.products}</PageHeader>
        <button className="rounded-md bg-purple-800 dark:bg-white dark:text-black text-white px-2 py-1 font-semibold whitespace-nowrap text-xs sm:text-sm">
          <Link href={"/admin/products/new"}>{page.addProduct}</Link>
        </button>
      </div>

      <ProductsTable lang={lang} />
    </div>
  );
}
