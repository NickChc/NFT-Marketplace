"use client";

import { DotsIcon } from "@/assets/icons";
import { useEffect, useState } from "react";

export function UsersDropdownMenu() {
  const [open, setOpen] = useState<boolean>(false);

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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`p-2 ${open ? "cursor-default" : "cursor-pointer"}`}
      >
        <DotsIcon />
      </button>
      {open && (
        <div className="absolute top-6 right-6 p-1 flex flex-col items-start z-50 bg-white rounded-md">
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 rounded-t-md dark:text-black ">
            Mock
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 dark:text-black">
            Mock
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 dark:text-black">
            Mock
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default bg-red-300 text-left p-1 hover:text-red-800 rounded-b-md dark:text-black dark:hover:text-red-800">
            Mock
          </button>
        </div>
      )}
    </div>
  );
}
