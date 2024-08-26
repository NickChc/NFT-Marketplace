import { PropsWithChildren } from "react";
import { Logo } from "@/app/[lang]/_components/Logo";

export function PageHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col-reverse gap-y-4 xs:flex-row items-start sm:items-end justify-between mx-3 sm:mx-6 pt-4 overflow-hidden">
      <h1
        className="font-semibold text-xl xs:text-2xl pb-1 sm:text-3xl
      md:text-3xl 2xl:text-4xl whitespace-nowrap px-1"
      >
        {children}
      </h1>
      <div className="block xs:hidden sm:block">
        <Logo />
      </div>
    </div>
  );
}
