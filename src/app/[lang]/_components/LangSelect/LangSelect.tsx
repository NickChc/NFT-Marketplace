"use client";

import { usePathname } from "next/navigation";
import { TLocale, i18n } from "../../../../../i18n.config";
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

  function redirectPathname(locale: TLocale) {
    if (pathname == null) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
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
    <div className="absolute top-1/2 -translate-y-1/2 left-4">
      <button
        className="w-10 h-10 p-2 rounded-md bg-white font-semibold"
        onClick={() => setOpenSelect((prev) => !prev)}
      >
        {lang.toUpperCase()}
      </button>
      {openSelect && (
        <ul className="flex flex-col gap-y-2 absolute top-[120%] bg-white border-solid border border-purple-500 p-1.5 rounded-md">
          {i18n.locales.map((loc) => {
            return (
              <li key={loc} className="w-full ">
                <Link
                  href={redirectPathname(loc)}
                  className={`px-2 py-1 flex items-center gap-x-3 ${
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
      )}
    </div>
  );
}
