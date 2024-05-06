import { TProduct } from "@/@types/general";
import { TLocale } from "../../../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { ProductsForm } from "@/app/[lang]/admin/products/_components/ProductsForm";
import { getProduct } from "@/app/[lang]/_api/getProduct";

interface AdminEditPageProps {
  params: {
    lang: TLocale;
    id: string;
  };
}



export default async function AdminEditPage({ params }: AdminEditPageProps) {
  const product = await getProduct(params.id);
  return (
    <div className="flex flex-col mx-auto max-w-[70%]">
      <PageHeader>Edit Product</PageHeader>
      <ProductsForm product={product} />
    </div>
  );
}
