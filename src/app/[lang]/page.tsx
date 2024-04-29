import { getDictionaries } from "@/lib/dictionary";
import { TLocale } from "../../../i18n.config";

interface HomePageProps {
  params: {
    lang: TLocale;
  };
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <div>
      <h1>{page.home}</h1>
    </div>
  );
}
