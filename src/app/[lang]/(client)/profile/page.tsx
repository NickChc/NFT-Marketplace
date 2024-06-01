import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { LogOutButton } from "@/app/[lang]/(client)/profile/_components/LogOutButton";
import { ProfileData } from "@/app/[lang]/(client)/profile/_components/ProfileData";

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
    <div className="mx-auto md:w-[70%] xl:max-w-4xl">
      <PageHeader>{page.profile}</PageHeader>
      <div className="mt-6 p-2 sm:p-3 ">
        <ProfileData />
        <LogOutButton lang={lang} />
      </div>
    </div>
  );
}
