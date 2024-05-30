import { PropsWithChildren } from "react";

export async function Navigation({ children }: PropsWithChildren) {
  return (
    <nav className="w-full flex items-center justify-center sm:gap-x-6 lg:gap-x-9 bg-purple-800 relative overflow-hidden sm:overflow-visible border-solid border-purple-100 dark:border-gray-800 border-x-0 border-t-0 border-b-0 sm:border-b">
      {children}
    </nav>
  );
}
