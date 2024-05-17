import { getDictionaries } from "@/lib/dictionary";
import { TLocale } from "../../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";

interface SignUpPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function SignUpPage({
  params: { lang },
}: SignUpPageProps) {
  const { page } = await getDictionaries(lang);
  return (
    <div className="container mx-6">
      <PageHeader>{page.signUpCap}</PageHeader>
      <form></form>
    </div>
  );
}
