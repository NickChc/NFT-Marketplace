"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useRouter } from "next/navigation";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useState } from "react";
import { useDictionary } from "@/hooks/useDictionary";
import { LogOutIcon } from "@/assets/icons";

interface LogOutButtonProps {
  lang: TLocale;
}

export function LogOutButton({ lang }: LogOutButtonProps) {
  const translations = useDictionary();
  const [loading, setLoading] = useState<boolean>(false);
  const { handleLogOut } = useAuthProvider();
  const router = useRouter();

  async function logOut() {
    try {
      setLoading(true);
      await handleLogOut();
      router.replace(`/${lang}`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <button
      className="p-2 hover:text-red-500 flex items-center gap-3 text-lg ml-auto disabled:hover:text-black dark:disabled:hover:text-white disabled:opacity-75"
      onClick={logOut}
      disabled={loading}
    >
      {loading
        ? `${translations.page.loggingOut}...`
        : translations.page.logOut}
      <LogOutIcon className="text-xl rotate-180" />
    </button>
  );
}
