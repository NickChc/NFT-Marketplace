"use client";

import { CloseIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";

interface LoginFormPopupProps {
  error: string;
  closePopup: () => void;
}

export function LoginFormPopup({ error, closePopup }: LoginFormPopupProps) {
  const translations = useDictionary();

  return (
    <div className="bg-gray-300 relative flex flex-col items-stretch gap-y-4 w-full mt-4 sm:mt-9 p-4 overflow-hidden rounded-sm border-solid border border-purple-800">
      {error !== "" && (
        <div className="text-red-500 text-center">
          {error}
          <span
            className="absolute top-1 right-1 text-red-500 cursor-pointer text-2xl"
            onClick={closePopup}
          >
            <CloseIcon />
          </span>
        </div>
      )}
    </div>
  );
}
