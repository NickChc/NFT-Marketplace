import { TLocale } from "../../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { RegisterForm } from "@/app/[lang]/(client)/auth/_components/RegisterForm";

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
    <div className="mx-auto max-w-4xl">
      <PageHeader>{page.signUpCap}</PageHeader>
      <RegisterForm />
    </div>
  );
}
