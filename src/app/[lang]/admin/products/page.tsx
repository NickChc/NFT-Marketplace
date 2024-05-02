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
      <PageHeader>{page.products}</PageHeader>

      <ProductsTable lang={lang} />
    </div>
  );
}
