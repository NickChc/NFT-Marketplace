import { TLocale } from "../../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { ProductsForm } from "@/app/[lang]/admin/products/_components/ProductsForm";

interface CreateProductPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function CreateProductPage({
  params,
}: CreateProductPageProps) {
  return (
    <div className="flex flex-col mx-auto max-w-[70%]">
      <PageHeader>Create Product</PageHeader>
      <ProductsForm />
    </div>
  );
}
