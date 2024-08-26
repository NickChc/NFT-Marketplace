"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useFormState } from "react-dom";
import { reportProblem } from "@/app/[lang]/(client)/_actions/general";
import { ProblemSubmitBtn } from "@/app/[lang]/(client)/_component/Footer/ProblemForm/ProblemSubmitBtn";
import { useEffect, useState } from "react";
import { CheckIcon } from "@/assets/icons";
import { REPORTS } from "@/config/storageKeys";

export function ProblemForm() {
  const translations = useDictionary();
  const [text, setText] = useState<string>("");
  const [falseReport, setFalseReport] = useState<boolean>(false);
  const [error, action] = useFormState(
    reportProblem.bind(null, falseReport),
    {}
  );
  const [status, setStatus] = useState<"none" | "success">("none");

  function handleClick() {
    const savedReports = sessionStorage.getItem(REPORTS);

    if (savedReports) {
      const reportCount = JSON.parse(savedReports);
      if (reportCount > 2) return;

      const newReportCount = reportCount + 1;
      sessionStorage.setItem(REPORTS, newReportCount);
    } else {
      sessionStorage.setItem(REPORTS, "1");
    }
  }

  useEffect(() => {
    if (error.text !== "success") return;

    setText("");
    setStatus("success");
    const savedReports = sessionStorage.getItem(REPORTS);

    setTimeout(() => {
      if (savedReports && JSON.parse(savedReports) == 3) {
        setFalseReport(true);
      }
      setStatus("none");
    }, 4000);
  }, [error]);

  return (
    <form
      action={action}
      className="flex flex-col gap-y-4 items-stretch gap-x-3 max-w-3xl mx-auto "
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-28 resize-none rounded-md text-black dark:text-custom-white outline-none px-2 py-1 scrollbar-small"
        name="text"
        id="text"
      />
      {error?.text && error.text !== "success" && (
        <div className="text-red-600">
          {error?.text[0].includes("at least 1 char")
            ? translations.page.authValidation.emptyField
            : error?.text}
        </div>
      )}
      <ProblemSubmitBtn onClick={handleClick} disabled={status === "success"}>
        <div
          className={`text-green-500 flex items-center gap-x-4 text-sm sm:text-lg transition-all duration-300 ${
            status === "success" ? "" : "scale-0 absolute "
          } `}
        >
          <CheckIcon className="font-bold text-xl md:text-2xl shrink-0 hidden sm:block" />
          {translations.page.reportThankYou}
        </div>
        <div
          className={`transition-all duration-300 ${
            status === "success" ? "scale-0 absolute invisible" : ""
          }`}
        >
          {translations.page.send}
        </div>
      </ProblemSubmitBtn>
    </form>
  );
}
