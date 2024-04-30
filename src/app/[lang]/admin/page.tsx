import { TLocale } from "../../../../i18n.config";
import { PageHeader } from "../_components/PageHeader";
import { DashboardCard } from "@/app/[lang]/admin/_components/DashboardCard";

interface AdminDashboardProps {
  params: {
    lang: TLocale;
  };
}

export default function AdminDashboard({
  params: { lang },
}: AdminDashboardProps) {
  return (
    <div className="w-full sm:w-[80%] flex flex-col mx-auto pt-9">
      <PageHeader>DASHBOARD</PageHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto mt-9 gap-x-4">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
    </div>
  );
}
