import { PropsWithChildren } from "react";

export function HeaderNav({ children }: PropsWithChildren) {
  return (
    <nav className="w-full flex items-center justify-center sm:gap-x-6 lg:gap-x-9 bg-purple-800 relative overflow-hidden sm:overflow-visible">
      {children}
    </nav>
  );
}
