import { TLocale } from "../../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { ForgotPasswordForm } from "@/app/[lang]/(client)/auth/_components/ForgotPasswordForm";
import { getDictionaries } from "@/lib/dictionary";

interface ForgotPasswordPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function ForgotPasswordPage({
  params: { lang },
}: ForgotPasswordPageProps) {
  const { page } = await getDictionaries(lang);
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader>{page.resetPasswordCap}</PageHeader>
      <ForgotPasswordForm lang={lang} />
    </div>
  );
}
