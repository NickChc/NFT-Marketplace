"use client";

import { i18n } from "../../../../../i18n.config";
import { MonkeyIcon } from "@/assets/icons";
import { usePathname } from "next/navigation";

export function Logo() {
  const pathname = usePathname();
  const { locales } = i18n;

  const logoViews = [
    "info",
    ...locales,
    ...locales.map((loc) => `${loc}/products`),
  ];

  if (!logoViews.some((view) => pathname.endsWith(view))) return null;

  return (
    <div className="flex items-end justify-end text-purple-800 gap-x-3 select-none">
      <MonkeyIcon className="text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl" />
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold font-monoton whitespace-nowrap">
        NFT Marketplace
      </h2>
    </div>
  );
}