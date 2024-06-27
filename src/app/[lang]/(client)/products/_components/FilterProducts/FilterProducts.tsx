"use client";

import { useDictionary } from "@/hooks/useDictionary";
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
    <div className="w-full sm:w-fit px-6 sm:px-9 mt-3 text-lg flex flex-col items-stretch sm:flex-row gap-4 sm:items-center gap-x-3 whitespace-nowrap sm:text-xl">
      <label className="font-semibold">
        {translations.page.filterProducts} -{" "}
      </label>
      <select
        className="p-1 cursor-pointer dark:bg-gray-800 bg-white border-solid border border-purple-800 rounded-md outline-none"
        value={filterBy}
        onChange={(e) => {
          if (e.target.value === TFilterBy_Enum.ALL) {
            router.push("?");
          } else {
            router.push(`?filterBy=${e.target.value}`);
          }
          router.refresh();
        }}
      >
        <option className="hover:bg-red-500 " value={TFilterBy_Enum.ALL}>
          {translations.page.all}
        </option>
        <option className="hover:bg-red-500 " value={TFilterBy_Enum.FORBIDDING}>
          {translations.page.forBidding}
        </option>
        <option className="hover:bg-red-500 " value={TFilterBy_Enum.FORSALE}>
          {translations.page.forSale}
        </option>
      </select>
    </div>
  );
}
