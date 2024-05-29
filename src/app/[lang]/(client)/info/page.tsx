import { getDictionaries } from "@/lib/dictionary";
import { TLocale } from "../../../../../i18n.config";
import { PageHeader } from "../../_components/PageHeader";

interface InfoPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function InfoPage({ params: { lang } }: InfoPageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <>
      <PageHeader>{page.info.toUpperCase()}</PageHeader>
    </>
  );
}
