"use client";

import { TLocale } from "../../../../../i18n.config";
import { MonkeyIcon } from "@/assets/icons";
import { usePathname } from "next/navigation";

interface LogoProps {
  lang: TLocale;
}

export function Logo({ lang }: LogoProps) {
  const pathname = usePathname();

  const logoViews = ["products", lang, "info"];

  if (!logoViews.some((view) => pathname.endsWith(view))) return null;

  return (
    <div className="w-[80%] mx-auto flex items-end justify-end text-purple-800 gap-x-3 py-4 select-none">
      <MonkeyIcon className="text-3xl sm:text-4xl md:text-5xl" />
      <h2 className="text-base sm:text-2xl md:text-3xl font-bold font-monoton whitespace-nowrap">
        NFT Marketplace
      </h2>
    </div>
  );
}
