"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useFormState } from "react-dom";
import { reportProblem } from "@/app/[lang]/(client)/_actions/general";
import { ProblemSubmitBtn } from "@/app/[lang]/(client)/_component/Footer/ProblemForm/ProblemSubmitBtn";

export function ProblemForm() {
  const translations = useDictionary();
  const [error, action] = useFormState(reportProblem, {});

  return (
    <form
      action={action}
      className="flex flex-col gap-y-4 items-stretch gap-x-3 max-w-3xl mx-auto "
    >
      <textarea
        className="w-full min-h-28 resize-none rounded-md text-black dark:text-white outline-none px-2 py-1 scrollbar-small"
        name="text"
        id="text"
      />
      {error.text && (
        <div className="text-red-600">
          {error.text[0].toLocaleLowerCase() === "required"
            ? translations.page.authValidation.emptyField
            : error.text}
        </div>
      )}
      <ProblemSubmitBtn>{translations.page.send}</ProblemSubmitBtn>
    </form>
  );
}
