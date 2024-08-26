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
      className={`whitespace-nowrap text-center no-underline font-bold truncate text-[0.6rem] xs:text-sm sm:text-base md:text-xl lg:text-3xl min-h-full duration-75 px-1 sm:px-3 py-3 sm:py-4 sm:p-4 sm:border-none border-t border-solid border-custom-white dark:border-custom-white ${
        pathname.endsWith(path)
          ? "cursor-default bg-custom-white dark:bg-add-2 text-add "
          : "text-custom-white bg- hover:opacity-75"
      }`}
      href={path}
    >
      {title}
    </Link>
  );
}
