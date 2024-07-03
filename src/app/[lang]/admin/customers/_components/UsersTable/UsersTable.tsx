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
    <table className="w-[90%] sm:w-full mt-9 mx-auto">
      <thead>
        <tr className="text-sm md:text-xl lg:text-2xl">
          <th className="py-4">
            <span className="sr-only">Owns Something</span>
          </th>
          <th className="py-4 whitespace-nowrap`">{page.name}</th>
          <th className="py-4 whitespace-nowrap">{page.email}</th>
          <th className="py-4 whitespace-nowrap">{page.totalSpent}</th>
          <th className="py-4 whitespace-nowrap">{page.owns}</th>
          <th className="py-4 whitespace-nowrap">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="min-h-96 text-[.55rem] sm:text-base lg:text-xl">
        {users?.map((user) => {
          return (
            <tr key={user.id}>
              <td className="text-[.65rem] sm:text-base md:text-2xl py-4">
                {user.isFrozen ? (
                  <FilledCircleIcon className="text-red-500" />
                ) : user.ownings.length > 0 ? (
                  <FilledCircleIcon className="text-green-500" />
                ) : (
                  <EmptyCircleIcon />
                )}
              </td>
              <td className="truncate text-center py-4">
                {` ${user.name} ${user.surname}`}
              </td>
              <td className="truncate max-w-10 sm:max-w-20 md:max-w-40 text-center py-4">
                {user.email}
              </td>
              <td className="truncate text-center py-4">
                {formatCurrency(user.spentInCents / 100)}
              </td>
              <td className="truncate text-center py-4 max-w-10 sm:max-w-20 md:max-w-40">
                {user.ownings.length > 1
                  ? user.ownings.length
                  : user.ownings.length > 0
                  ? user.ownings[0].productName
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
