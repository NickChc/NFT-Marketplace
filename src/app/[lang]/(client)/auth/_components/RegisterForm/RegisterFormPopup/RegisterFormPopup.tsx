"use client";

import { CloseIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";

interface RegisterFormPopupProps {
  verificationError: string;
  setVerificationError: React.Dispatch<React.SetStateAction<string>>;
  verification: "sent" | "rest";
  loadingVerify: boolean;
  confirmVerified: () => void;
}

export function RegisterFormPopup({
  verificationError,
  setVerificationError,
  verification,
  loadingVerify,
  confirmVerified,
}: RegisterFormPopupProps) {
  const translations = useDictionary();

  return (
    <div className="z-40 bg-gray-300 flex flex-col items-stretch gap-y-4 fixed bottom-6 sm:bottom-9 md:bottom-12 right-1/2 translate-x-1/2 mx-auto w-[90%] md:w-[70%] xl:w-[80%] max-w-[840px] brightness-125 p-4 overflow-hidden rounded-sm border-solid border border-add ">
      {verificationError !== "" && (
        <div className="text-alert text-center">
          {verificationError}
          <span
            className="absolute top-1 right-1 text-alert cursor-pointer text-2xl"
            onClick={() => setVerificationError("")}
          >
            <CloseIcon />
          </span>
        </div>
      )}
      {verification === "sent" && (
        <div className="text-add flex flex-col sm:flex-row gap-y-2 text-center items-center justify-around gap-x-4">
          {translations.page.authValidation.verificationSent}
          <button
            className="border-solid border border-add text-add rounded-md px-2 py-0.5 font-semibold disabled:opacity-75"
            disabled={loadingVerify}
            onClick={(e) => {
              e.stopPropagation();
              confirmVerified();
            }}
          >
            {loadingVerify
              ? `${translations.page.checkingCap}...`
              : `${translations.page.verifiedCap}!`}
          </button>
        </div>
      )}
    </div>
  );
}
