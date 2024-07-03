import { formatCurrency, formatNumber } from "@/lib/formatters";
import { TLocale } from "../../../../../../i18n.config";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { DropdownMenu } from "@/app/[lang]/admin/_components/Table/DropdownMenu";
import { CheckIcon, CrossIcon } from "@/assets/icons";
import { getDictionaries } from "@/lib/dictionary";

interface TableProps {
  lang: TLocale;
}

export async function ProductsTable({ lang }: TableProps) {
  const products = await getProducts();
  const { page } = await getDictionaries(lang);

  return (
    <table className="max-w-full w-full mt-4 sm:mt-9 mx-auto text-[.7rem] sm:text-sm md:text-base">
      <thead>
        <tr className="text-sm md:text-xl lg:text-2xl">
          <th className="py-4">
            <span className="sr-only">Available For Purchase</span>
          </th>
          <th className="py-4">{page.name}</th>
          <th className="py-4">{page.price}</th>
          <th className="py-4">{page.owner}</th>
          <th className="py-4">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="min-h-96">
        {products?.map((product) => {
          return (
            <tr key={product.id}>
              <td className="text-base sm:text-lg md:text-2xl py-4">
                {product.isAvailable ? (
                  <CheckIcon className="text-green-500" />
                ) : (
                  <CrossIcon className="text-red-500" />
                )}
              </td>
              <td className="truncate max-w-14 sm:max-w-24 text-center py-4">
                {product.name}
              </td>
              <td className="truncate text-center py-4">
                {formatCurrency(product.priceInCents / 100)}
              </td>
              <td className="truncate max-w-30 sm:max-w-auto text-center py-4">
                {product.owner?.fullName || (
                  <span className="font-semibold text-green-500">
                    {page.available}
                  </span>
                )}
              </td>
              <td className="max-w-30 sm:max-w-auto text-center py-4">
                <DropdownMenu lang={lang} product={product} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
