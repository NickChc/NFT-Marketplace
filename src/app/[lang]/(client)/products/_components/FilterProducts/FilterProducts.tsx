"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { filterSearchParams } from "@/lib/filterSearchParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export enum TFilterBy_Enum {
  ALL = "all",
  FORSALE = "forSale",
  FORBIDDING = "forBidding",
}

export function FilterProducts() {
  const [filterBy, setFilterBy] = useState<TFilterBy_Enum>(TFilterBy_Enum.ALL);
  const router = useRouter();
  const searchParams = useSearchParams();
  const translations = useDictionary();

  useEffect(() => {
    const filter = searchParams.get("filterBy");
    if (filter == null) {
      return setFilterBy(TFilterBy_Enum.ALL);
    } else {
      setFilterBy(filter as TFilterBy_Enum);
    }
  }, [searchParams]);

  return (
    <div className="text-lg flex flex-col items-start sm:items-center sm:flex-row gap-4 gap-x-3 whitespace-nowrap sm:text-xl">
      <label className="font-semibold flex items-center gap-x-3 text-base sm:text-xl">
        {translations.page.filterProducts}{" "}
        <span className="hidden sm:block">-</span>{" "}
      </label>
      <select
        className="sm:p-1 cursor-pointer dark:bg-gray-800 text-black dark:text-white border-solid border border-purple-800 rounded-md outline-none"
        value={filterBy}
        onChange={(e) => {
          const filteredSearchParams = filterSearchParams(
            searchParams.toString(),
            "filterBy"
          );
          if (e.target.value === TFilterBy_Enum.ALL) {
            router.push(`?${filteredSearchParams}`);
          } else {
            router.push(`?${filteredSearchParams}&filterBy=${e.target.value}`);
            // router.push(`?filterBy=${e.target.value}`);
          }
          router.refresh();
        }}
      >
        <option value={TFilterBy_Enum.ALL}>{translations.page.all}</option>
        <option value={TFilterBy_Enum.FORBIDDING}>
          {translations.page.forBidding}
        </option>
        <option value={TFilterBy_Enum.FORSALE}>
          {translations.page.forSale}
        </option>
      </select>
    </div>
  );
}
