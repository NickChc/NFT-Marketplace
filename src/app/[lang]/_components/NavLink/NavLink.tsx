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
      className={`whitespace-nowrap no-underline font-bold  text-[.75rem] sm:text-xl md:text-2xl lg:text-3xl min-h-full duration-75 px-3 py-4 sm:p-4 ${
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
