import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { LogOutButton } from "@/app/[lang]/(client)/profile/_components/LogOutButton";
import { ProfileData } from "@/app/[lang]/(client)/profile/_components/ProfileData";
import { Collection } from "@/app/[lang]/(client)/profile/_components/Collection";
import { DeleteAccount } from "@/app/[lang]/(client)/profile/_components/DeleteAccount";

interface ProfilePageProps {
  params: {
    lang: TLocale;
  };
}

export default async function ProfilePage({
  params: { lang },
}: ProfilePageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <div className="mx-auto md:w-[70%] xl:max-w-4xl min-h-dvh relative">
      <PageHeader>{page.profile}</PageHeader>
      <div className="mt-2 sm:mt-6 p-2 sm:p-3">
        <LogOutButton lang={lang} />
        <ProfileData />
        <Collection lang={lang} />
      </div>
      <DeleteAccount text={{ ...page }} />
    </div>
  );
}
