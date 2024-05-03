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
  const { activate, deactivate, edit, deleteProduct } = page;

  return (
    <table className="max-w-full w-full mt-9 mx-auto text-[.7rem] sm:text-sm md:text-base">
      <thead>
        <tr className="mb-14 text-sm md:text-xl">
          <th>
            <span className="sr-only">Available For Purchase</span>
          </th>
          <th>{page.name}</th>
          <th>{page.price}</th>
          <th>{page.orders}</th>
          <th>
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => {
          return (
            <tr key={product.id} className="p-2 mt-9">
              <td className="text-base sm:text-lg md:text-2xl">
                {product.isAvailable ? (
                  <CheckIcon className="text-green-500" />
                ) : (
                  <CrossIcon className="text-red-500" />
                )}
              </td>
              <td className="truncate max-w-14 sm:max-w-24 text-center">
                {product.name}
              </td>
              <td className="truncate text-center">
                {formatCurrency(product.priceInCents / 100)}
              </td>
              <td className="truncate max-w-30 sm:max-w-auto text-center">
                {product.orders}
              </td>
              <td className="max-w-30 sm:max-w-auto text-center">
                <DropdownMenu
                  product={product}
                  text={{ activate, deactivate, edit, deleteProduct }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
