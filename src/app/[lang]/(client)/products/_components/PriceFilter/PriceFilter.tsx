"use client";

import { filterSearchParams } from "@/lib/filterSearchParams";
import { formatCurrency } from "@/lib/formatters";
import { revalidatePath } from "next/cache";
import { useRouter, useSearchParams } from "next/navigation";

export function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  const ranges = [
    { min: 100, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 40000 },
    { min: 40000, max: Infinity },
  ];

  function handleClick(range: [number, number]) {
    const newSearchParams = filterSearchParams(searchParams.toString(), [
      "min",
      "max",
    ]);

    if (searchParams.get("min") === range[0].toString()) {
      router.push(`?${newSearchParams}`);
    } else {
      router.push(`?${newSearchParams}&min=${range[0]}&max=${range[1]}`);
    }
  }

  return (
    <div className="grid grid-cols-auto min-w-full sm:min-w-fit sm:grid-cols-2 max-w-fit xs:max-w-full gap-y-4 gap-x-3 sm:gap-x-6 overflow-auto">
      {ranges.map((range) => {
        return (
          <button
            key={`${range.min}${range.max}`}
            onClick={() => handleClick([range.min, range.max])}
            className={`px-1 sm:px-2 py-1 border-solid border border-purple-800 rounded-md text-[0.7rem] whitespace-nowrap overflow-hidden sm:text-sm text-center font-semibold duration-150 ${
              Number(min) === range.min
                ? "bg-purple-800 text-white"
                : "dark:hover:bg-gray-700 hover:bg-gray-300 text-purple-800"
            }`}
          >
            {`${formatCurrency(range.min)} - ${
              range.max === Infinity ? "&" : formatCurrency(range.max)
            }`}
          </button>
        );
      })}
    </div>
  );
}
