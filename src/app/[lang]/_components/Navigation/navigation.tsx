import { PropsWithChildren } from "react";

export async function Navigation({ children }: PropsWithChildren) {
  return (
    <nav className="w-full flex items-center justify-center gap-x-2 sm:gap-x-6 lg:gap-x-9 bg-purple-800 relative">
      {children}
    </nav>
  );
}


  
