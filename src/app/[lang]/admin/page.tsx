import { TLocale } from "../../../../i18n.config";
import { PageHeader } from "../_components/PageHeader";
import { DashboardCard } from "@/app/[lang]/admin/_components/DashboardCard";
import { db } from "@/firebase";
import { getDictionaries } from "@/lib/dictionary";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { collection, getDocs } from "firebase/firestore";

const salesCollectionRef = collection(db, "orders");
const usersCollectionRef = collection(db, "users");
const productCollectionRef = collection(db, "product");

interface TOrder {
  pricePaidInCents: number;
  id: string;
  productId: string;
}

interface TUser {
  pricePaidInCents: number;
  id: string;
}

interface TProduct {
  id: string;
  isAvailable: boolean;
}

interface AdminDashboardProps {
  params: {
    lang: TLocale;
  };
}

async function getOrders() {
  try {
    const data = await getDocs(salesCollectionRef);
    const orders = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return orders as TOrder[];
  } catch (error: any) {
    console.log(error.message);
  }
}

async function getUsers() {
  try {
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return users as TUser[];
  } catch (error: any) {
    console.log(error.message);
  }
}

async function getProducts() {
  try {
    const data = await getDocs(productCollectionRef);
    const products = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return products as TProduct[];
  } catch (error: any) {
    console.log(error.message);
  }
}

export default async function AdminDashboard({
  params: { lang },
}: AdminDashboardProps) {
  const [orders, users, products] = await Promise.all([
    getOrders(),
    getUsers(),
    getProducts(),
  ]);

  const totalPrice = orders?.reduce(
    (acc, curr) => acc + curr.pricePaidInCents,
    0
  );

  const avarageSpent = users
    ? users.reduce((acc, curr) => acc + curr.pricePaidInCents, 0) / users.length
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto mt-9 gap-x-4 ">
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
