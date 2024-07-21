import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export function ProblemSubmitBtn({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`rounded-md px-2 py-1 outline-none bg-white text-purple-900 font-semibold transition-all duration-150 ease-in active:scale-[90%] xl:text-xl ${
        pending ? "scale-[90%] opacity-75" : ""
      } `}
    >
      {children}
    </button>
  );
}
