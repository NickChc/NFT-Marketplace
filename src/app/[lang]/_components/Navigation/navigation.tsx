import { getDictionaries } from "@/lib/dictionary";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { TLocale } from "../../../../../i18n.config";

interface NavigationProps {
  lang: TLocale;
}

export async function Navigation({ lang }: NavigationProps) {
  const { page } = await getDictionaries(lang);
  return (
    <nav className="w-full flex items-center justify-center gap-x-4 sm:gap-x-6 lg:gap-x-9 bg-purple-800 ">
      <NavLink path={`/${lang}/admin`} title="Dashboard" />
      <NavLink path={`/${lang}/sales`} title="Sales" />
      <NavLink path={`/${lang}/customers`} title="Customers" />
    </nav>
  );
}
