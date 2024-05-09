"use client";

import { DotsIcon } from "@/assets/icons";
import { useEffect, useState, useTransition } from "react";
import { TLocale } from "../../../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";
import { deleteUser } from "@/app/[lang]/admin/_actions/users";
import { TUser } from "@/@types/general";
import { useRouter } from "next/navigation";

interface UsersDropdownMenuProps {
  user: TUser;
}

export function UsersDropdownMenu({ user }: UsersDropdownMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, transition] = useTransition();
  const router = useRouter();

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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`p-2 ${open ? "cursor-default" : "cursor-pointer"}`}
      >
        <DotsIcon />
      </button>
      {open && (
        <div className="absolute top-6 right-6 p-1 flex flex-col items-start z-50 bg-white rounded-md">
          <button
            disabled={isPending || user.ownings.length > 0}
            className="w-full cursor-pointer disabled:cursor-default bg-red-300 text-left p-1 hover:text-red-800 rounded-md dark:text-black dark:hover:text-red-800"
            onClick={() =>
              transition(async () => {
                await deleteUser(user);
                router.refresh();
              })
            }
          >
            {translations.page.delete}
          </button>
        </div>
      )}
    </div>
  );
}
