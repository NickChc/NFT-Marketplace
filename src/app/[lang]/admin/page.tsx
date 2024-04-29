import { TLocale } from "../../../../i18n.config";
import { PageHeader } from "../_components/PageHeader";

interface AdminDashboardProps {
  params: {
    lang: TLocale;
  };
}

export default function AdminDashboard({
  params: { lang },
}: AdminDashboardProps) {
  return (
    <div className="w-full flex flex-col  ">
      <PageHeader>DASHBOARD</PageHeader>
    </div>
  );
}
