import { PropsWithChildren } from "react";

export function PageHeader({ children }: PropsWithChildren) {
  return (
    <h1
      className="mx-6 pt-4 font-semibold text-2xl sm:text-3xl 
    md:text-4xl lg:text-5xl"
    >
      {children}
    </h1>
  );
}
