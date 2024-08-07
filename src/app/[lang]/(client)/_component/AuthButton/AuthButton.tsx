"use client";

import { TLocale } from "../../../../../../i18n.config";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingIcon, UserIcon } from "@/assets/icons";
import { usePathname } from "next/navigation";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useUserNotifications } from "@/hooks/useUserNotifications";

interface AuthButtonProps {
  lang: TLocale;
}

export function AuthButton({ lang }: AuthButtonProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  const pathname = usePathname();
  const { currentUser, loadingUser } = useAuthProvider();
  const { notifications } = useUserNotifications();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.includes("auth") || pathname.includes("profile")) return <></>;

  if (!mounted) {
    return (
      <button
        className="rounded-full overflow-hidden  absolute top-1/2 -translate-y-1/2 right-20 bg-white text-purple-800 w-8 md:w-10 aspect-square grid place-items-center opacity-75 cursor-default"
        disabled
      >
        <UserIcon />
      </button>
    );
  }

  return (
    <button className="rounded-full absolute top-1/2 -translate-y-1/2 right-3 sm:right-20 active:scale-90 transition-all duration-200">
      {loadingUser ? (
        <span className="font-semibold bg-white w-8 md:w-10 aspect-square grid place-items-center rounded-full">
          <LoadingIcon className="animate-spin text-xl text-purple-800" />
        </span>
      ) : currentUser ? (
        <>
          {notifications.length > 0 && (
            <Link
              href={`/${lang}/profile`}
              className="bg-red-500 absolute -top-1 -right-1 text-white z-50 grid place-items-center rounded-full w-4 md:w-5 text-xs md:text-sm aspect-square"
            >
              {notifications.length}
            </Link>
          )}
          <Link
            href={`/${lang}/profile`}
            className="bg-white text-purple-800 w-8 md:w-10 rounded-full aspect-square grid place-items-center"
          >
            {currentUser.name === ""
              ? currentUser.email[0].toLocaleUpperCase()
              : currentUser.name[0].toUpperCase()}
          </Link>
        </>
      ) : (
        <Link
          href={`/${lang}/auth/sign-in`}
          className="bg-white text-purple-800 w-8 md:w-10 aspect-square rounded-full grid place-items-center"
        >
          <UserIcon />
        </Link>
      )}
    </button>
  );
}
