import { TLocale } from "../../../../../../i18n.config";

interface CreateProductPageProps {
  params: {
    lang: TLocale;
  };
}

export default function CreateProductPage({ params }: CreateProductPageProps) {
  return <form className="flex flex-col mx-auto max-w-[70%]">NEW PRODUCT</form>;
}
