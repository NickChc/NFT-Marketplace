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
      className={`no-underline font-bold text-md sm:text-xl md:text-2xl lg:text-3xl min-h-full  duration-75 p-4 ${
        pathname === path
          ? "cursor-default bg-white text-purple-800"
          : "text-white bg-purple-800 hover:opacity-75"
      }`}
      href={path}
    >
      {title}
    </Link>
  );
}
