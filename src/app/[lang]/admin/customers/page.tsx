import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { UsersTable } from "@/app/[lang]/admin/customers/_components/UsersTable";

interface AdminUsersPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function AdminUsersPage({
  params: { lang },
}: AdminUsersPageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col mx-auto min-h-[50dvh]">
      <PageHeader>{page.customers}</PageHeader>
      <UsersTable lang={lang} />
    </div>
  );
}
