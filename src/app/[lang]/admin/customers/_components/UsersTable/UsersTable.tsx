import { getDictionaries } from "@/lib/dictionary";
import { TLocale } from "../../../../../../../i18n.config";
import { getUsers } from "@/app/[lang]/_api/getUsers";
import { formatCurrency } from "@/lib/formatters";
import { EmptyCircleIcon, FilledCircleIcon } from "@/assets/icons";
import { UsersDropdownMenu } from "@/app/[lang]/admin/customers/_components/UsersTable/UsersDropdownMenu";

interface UsersTableProps {
  lang: TLocale;
}

export async function UsersTable({ lang }: UsersTableProps) {
  const { page } = await getDictionaries(lang);

  const users = await getUsers();

  if (users == null) return <h1>{page.noUsersFound}</h1>;
  return (
    <table className="max-w-full w-full mt-9 mx-auto text-[.7rem] sm:text-sm md:text-base">
      <thead>
        <tr className="text-sm md:text-xl lg:text-2xl">
          <th className="py-4">
            <span className="sr-only">Owns Something</span>
          </th>
          <th className="py-4">{page.name}</th>
          <th className="py-4">{page.email}</th>
          <th className="py-4">{page.totalSpent}</th>
          <th className="py-4">{page.owns}</th>
          <th className="py-4">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="min-h-96">
        {users?.map((user) => {
          return (
            <tr key={user.id}>
              <td className="text-base sm:text-lg md:text-2xl py-4">
                {user.ownings.length > 0 ? (
                  <FilledCircleIcon
                    className={`${
                      user.isFrozen ? "text-red-500" : "text-green-500"
                    }`}
                  />
                ) : (
                  <EmptyCircleIcon />
                )}
              </td>
              <td className="truncate text-center py-4">
                {` ${user.name} ${user.surname}`}
              </td>
              <td className="truncate text-center py-4">{user.email}</td>
              <td className="truncate text-center py-4">
                {formatCurrency(user.spentInCents / 100)}
              </td>
              <td className="truncate text-center py-4">
                {user.ownings.length > 0
                  ? user.ownings?.[0].productName
                  : page.ownsNothing}
              </td>
              <td className="max-w-30 sm:max-w-auto text-center py-4">
                <UsersDropdownMenu user={user} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
