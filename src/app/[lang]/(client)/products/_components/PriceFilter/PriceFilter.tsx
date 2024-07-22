"use client";

import { filterSearchParams } from "@/lib/filterSearchParams";
import { useRouter, useSearchParams } from "next/navigation";

export function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  const ranges = [
    { min: 100, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: Infinity },
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
    <div className="flex items-center gap-x-4">
      {ranges.map((range) => {
        return (
          <button
            onClick={() => handleClick([range.min, range.max])}
            className={`px-2 py-1 border-solid border border-purple-800 rounded-md ${
              Number(min) === range.min ? "bg-purple-800 text-white" : ""
            }`}
          >
            {`${range.min}$ - ${
              range.max === Infinity ? "&" : range.max + "$"
            }`}
          </button>
        );
      })}
    </div>
  );
}
