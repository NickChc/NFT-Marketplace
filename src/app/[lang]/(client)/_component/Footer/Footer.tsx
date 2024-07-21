import { TLocale } from "../../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { ProblemForm } from "@/app/[lang]/(client)/_component/Footer/ProblemForm";

interface FooterProps {
  lang: TLocale;
}

export async function Footer({ lang }: FooterProps) {
  const { page } = await getDictionaries(lang);

  return (
    <footer className="w-full px-6 min-h-60 sm:min-h-80 py-6 bg-purple-900 text-custom-white flex flex-col justify-between ">
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
