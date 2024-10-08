interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}

export function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <div className="p-3 rounded-3 flex flex-col min-w-full mx-4 overflow-hidden shadow-lg rounded-lg border-solid border-2 border-add-2 dark:border-gray-500">
      <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl whitespace-nowrap mb-4">
        {title}
      </h2>
      <h3 className="py-3 whitespace-nowrap lg:text-xl">{subtitle}</h3>
      <h4 className="text-gray-500">{body}</h4>
    </div>
  );
}
