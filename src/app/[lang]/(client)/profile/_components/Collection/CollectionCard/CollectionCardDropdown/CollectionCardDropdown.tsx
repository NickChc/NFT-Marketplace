"use client";

import { RightArrowIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";
import { useEffect, useState } from "react";

export function CollectionCardDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const translations = useDictionary();

  function closePopup() {
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("click", closePopup);

      return () => {
        document.removeEventListener("click", closePopup);
      };
    }
  }, [open]);

  return (
    <div className="relative">
      <span
        className={`flex items-center group duration-200 ${
          open ? "gap-6 mr-3 cursor-default" : "gap-3 mr-6 cursor-pointer"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {translations.page.more}
        <RightArrowIcon />
      </span>
      {open && (
        <div className="absolute bottom-6 right-6 sm:-right-9 p-1 flex flex-col items-start z-50 bg-white border-solid border border-purple-800 rounded-md">
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 rounded-t-md dark:text-black">
            {translations.page.sell}
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 dark:text-black rounded-b-md">
            {translations.page.return}
          </button>
        </div>
      )}
    </div>
  );
}
