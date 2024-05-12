import { TLocale } from "../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { DashboardCard } from "@/app/[lang]/admin/_components/DashboardCard";
import { getDictionaries } from "@/lib/dictionary";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { getOrders } from "@/app/[lang]/_api/getOrders";
import { getUsers } from "@/app/[lang]/_api/getUsers";
import { getProducts } from "@/app/[lang]/_api/getProducts";

interface AdminDashboardProps {
  params: {
    lang: TLocale;
  };
}

export default async function AdminDashboard({
  params: { lang },
}: AdminDashboardProps) {
  const [orders, users, products] = await Promise.all([
    getOrders(),
    getUsers(),
    getProducts(),
  ]);

  const totalPrice = orders?.reduce((acc, curr) => acc + curr.paidInCents, 0);

  const avarageSpent = users
    ? users.reduce((acc, curr) => acc + curr.spentInCents, 0) /
      users.length /
      100
    : 0;

  const availableProducts =
    products?.filter((product) => product.isAvailable).length || 0;

  const notAvailable =
    products?.filter((product) => product.isAvailable === false).length || 0;

  const { page } = await getDictionaries(lang);

  return (
    <div className="w-full md:w-[90%] lg:w-[80%] flex flex-col pt-9 mx-auto">
      <PageHeader>
        {lang === "en" ? page.dashboard.toUpperCase() : page.dashboard}
      </PageHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto mt-9 gap-x-4 place-items-center w-full">
        <DashboardCard
          title={page.sales}
          subtitle={`${formatNumber(orders?.length || 0)} ${page.orders}`}
          body={`${formatCurrency((totalPrice || 0) / 100)}`}
        />
        <DashboardCard
          title={page.customers}
          subtitle={`${formatCurrency(avarageSpent)} ${page.avarageSpent}`}
          body={`${formatNumber(users?.length || 0)} ${page.users}`}
        />
        <DashboardCard
          title={page.products}
          subtitle={`${formatNumber(availableProducts)} ${page.available}`}
          body={`${formatNumber(notAvailable)} ${page.inactive}`}
        />
      </div>
    </div>
  );
}
