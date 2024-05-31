"use client";

import { useRouter } from "next/navigation";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useState } from "react";
import { TLocale } from "../../../../../../../i18n.config";

interface LogOutButtonProps {
  lang: TLocale;
}

export function LogOutButton({ lang }: LogOutButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleLogOut, currentUser } = useAuthProvider();
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
      className="p-2 hover:text-red-500 cursor-pointer text-white"
      onClick={logOut}
    >
      {loading
        ? "Logging Out..."
        : `Log Out ${currentUser?.name || currentUser?.email || ""}`}
    </button>
  );
}
