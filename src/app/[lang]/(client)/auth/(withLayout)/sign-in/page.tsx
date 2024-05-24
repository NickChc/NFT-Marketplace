import { TLocale } from "../../../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getDictionaries } from "@/lib/dictionary";
import { LoginForm } from "@/app/[lang]/(client)/auth/_components/LoginForm";

interface SignInPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function SignInPage({
  params: { lang },
}: SignInPageProps) {
  const { page } = await getDictionaries(lang);
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader>{page.loginCap}</PageHeader>
      <LoginForm lang={lang} />
    </div>
  );
}
