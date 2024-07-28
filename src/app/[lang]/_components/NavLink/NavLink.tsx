"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  path: string;
  title: string;
}

export function NavLink({ path, title }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={`whitespace-nowrap text-center no-underline font-bold text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl min-h-full duration-75 px-2 sm:px-3 py-3 sm:py-4 sm:p-4 sm:border-none border-t border-solid border-white dark:border-white ${
        pathname.endsWith(path)
          ? "cursor-default bg-custom-white dark:bg-gray-900 text-purple-800 "
          : "text-white bg-purple-800 hover:opacity-75"
      }`}
      href={path}
    >
      {title}
    </Link>
  );
}
