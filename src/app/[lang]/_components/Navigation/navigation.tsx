import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { LangSelect } from "@/app/[lang]/_components/LangSelect";
import { ToggleTheme } from "@/app/[lang]/_components/ToggleTheme";

interface NavigationProps {
  lang: TLocale;
}

export async function Navigation({ lang }: NavigationProps) {
  const { page } = await getDictionaries(lang);
  return (
    <nav className="w-full flex items-center justify-center gap-x-2 sm:gap-x-6 lg:gap-x-9 bg-purple-800 relative">
      <LangSelect lang={lang} />
      <NavLink path={`/${lang}/admin`} title={page.dashboard} />
      <NavLink path={`/${lang}/admin/products`} title={page.products} />
      <NavLink path={`/${lang}/admin/customers`} title={page.customers} />
      <ToggleTheme />
    </nav>
  );
}
