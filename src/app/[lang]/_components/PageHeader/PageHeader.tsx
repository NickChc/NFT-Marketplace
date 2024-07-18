import { PropsWithChildren } from "react";
import { Logo } from "@/app/[lang]/_components/Logo";

export function PageHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col-reverse gap-y-4 sm:flex-row items-start sm:items-center justify-between mx-3 sm:mx-6 pt-4 ">
      <h1
        className="font-semibold text-xl sm:text-2xl
      md:text-3xl lg:text-4xl 2xl:text-5xl"
      >
        {children}
      </h1>
      <Logo />
    </div>
  );
}
