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
    <div className="flex items-end justify-end text-add gap-x-1 sm:gap-x-3 select-none">
      <MonkeyIcon className="shrink-0 text-2xl xs:text-xl sm:text-4xl md:text-5xl 2xl:text-6xl" />
      <h2 className="text-sm xs:text-xs sm:text-xl md:text-2xl lg:text-3xl 2xl:text-[2.5rem] font-bold font-monoton whitespace-nowrap">
        NFT MARKETPLACE
      </h2>
    </div>
  );
}
