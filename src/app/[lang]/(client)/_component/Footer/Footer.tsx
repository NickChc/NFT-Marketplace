"use client";

import { ProblemForm } from "@/app/[lang]/(client)/_component/Footer/ProblemForm";
import { useDictionary } from "@/hooks/useDictionary";
import { usePathname } from "next/navigation";

export function Footer() {
  const translations = useDictionary();
  const { page } = translations;

  const pathname = usePathname();

  if (pathname.includes("auth")) return null;

  return (
    <footer className="w-full px-6 min-h-60 sm:min-h-80 py-6 bg-add text-custom-white flex flex-col justify-between ">
      <div>
        <h3 className="text-xl text-center mb-4 font-semibold">
          {page.reportAProblem}
        </h3>
        <ProblemForm />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:gap-x-6 items-start sm:items-center justify-around gap-y-2 text-sm xl:text-base">
        <h4 className="whitespace-nowrap">
          <strong>Created By:</strong> Nika Chichua
        </h4>
        <h4 className="max-w-[95%] sm:max-w-sm truncate">
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/nika-chichua-051713290/"
            target="_blank"
            className="underline cursor-pointer hover:text-blue-300"
          >
            https://www.linkedin.com/in/nika-chichua-051713290/
          </a>
        </h4>
        <h4 className="max-w-[95%] sm:max-w-sm truncate">
          <strong>Github:</strong>{" "}
          <a
            href="https://github.com/NickChc"
            target="_blank"
            className="underline cursor-pointer hover:text-blue-300"
          >
            https://github.com/NickChc
          </a>
        </h4>
      </div>
    </footer>
  );
}
