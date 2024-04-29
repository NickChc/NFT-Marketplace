import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { TLocale } from "../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";

interface HomePageProps {
  params: {
    lang: TLocale;
  };
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  const { page } = await getDictionaries(lang);
  return (
    <>
      <PageHeader>{page.home}</PageHeader>
    </>
  );
}
