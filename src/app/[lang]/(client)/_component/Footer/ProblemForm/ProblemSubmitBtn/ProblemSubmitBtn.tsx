import { REPORTS } from "@/config/storageKeys";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

interface ProblemSubmitBtnProps {
  disabled?: boolean;
  onClick: () => void;
}

export function ProblemSubmitBtn({
  children,
  disabled,
  onClick,
}: PropsWithChildren<ProblemSubmitBtnProps>) {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={onClick}
      disabled={pending || disabled}
      type="submit"
      className={`rounded-md p-3 min-h-14 outline-none text-add bg-custom-white font-semibold transition-all duration-150 ease-in active:scale-[90%] xl:text-xl disabled:pointer-events-none flex items-center justify-center ${
        pending ? "scale-[90%] opacity-75" : ""
      } `}
    >
      {children}
    </button>
  );
}
