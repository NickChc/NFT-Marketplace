"use client";

import { TLocale, i18n } from "../../../../../i18n.config";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UKFlagImage from "@/assets/images/UKFlagImage.png";
import GeoFlagImage from "@/assets/images/GeoFlagImage.png";

interface LangSelectProps {
  lang: TLocale;
}

export function LangSelect({ lang }: LangSelectProps) {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function redirectPathname(locale: TLocale) {
    if (pathname == null) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    const urlParams = searchParams.toString();
    if (urlParams === "") {
      return segments.join("/");
    } else {
      return `${segments.join("/")}?${urlParams}`;
    }
  }

  function closePopup() {
    setOpenSelect(false);
  }

  useEffect(() => {
    if (openSelect) {
      document.addEventListener("click", closePopup);

      return () => {
        document.removeEventListener("click", closePopup);
      };
    }
  }, [openSelect]);

  return (
    <div className="relative sm:static">
      <button
        className="w-9 md:w-10 sm:aspect-square py-0.5 px-0 sm:py-0 rounded-sm bg-custom-white text-black dark:bg-add-2 dark:text-custom-white font-semibold text-sm sm:text-base flex items-center justify-center sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-4"
        onClick={() => setOpenSelect((prev) => !prev)}
      >
        {lang.toUpperCase()}
      </button>
      <ul
        className={`z-50 flex-col gap-y-2 absolute top-[130%] sm:top-[110%] left-1 sm:left-4 bg-custom-white border-solid border border-purple-500 p-1.5 rounded-md transition-display start-style-x ${
          openSelect ? "flex" : "hidden translate-x-[20px] opacity-0"
        } `}
      >
        {i18n.locales.map((loc) => {
          return (
            <li
              key={loc}
              className="w-full first:rounded-t-md first:rounded-b-none last:rounded-b-md last:rounded-t-none overflow-hidden"
            >
              <Link
                href={redirectPathname(loc)}
                className={`px-2 py-1 flex items-center gap-x-3 text-black dark:text-black  ${
                  lang === loc
                    ? "cursor-default opacity-50 brightness-20"
                    : "hover:bg-purple-300"
                }`}
              >
                {loc.toUpperCase()}
                <div className="rounded-full overflow-hidden aspect-square w-5 relative">
                  {loc === "en" ? (
                    <Image src={UKFlagImage} alt="UK Flag" fill />
                  ) : loc === "ka" ? (
                    <Image src={GeoFlagImage} alt="Geo Flag" fill />
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
