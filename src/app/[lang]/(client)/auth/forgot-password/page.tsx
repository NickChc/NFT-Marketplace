import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { ForgotPasswordForm } from "@/app/[lang]/(client)/auth/_components/ForgotPasswordForm";
import { TLocale } from "../../../../../../i18n.config";

interface ForgotPasswordPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function ForgotPasswordPage({
  params: { lang },
}: ForgotPasswordPageProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader>RESET PASSWORD</PageHeader>
      <ForgotPasswordForm lang={lang} />
    </div>
  );
}
