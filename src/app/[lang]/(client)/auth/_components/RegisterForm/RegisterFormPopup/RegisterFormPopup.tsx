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
    <div className="bg-gray-300 flex flex-col items-stretch gap-y-4 absolute bottom-14 right-0 left-0 p-4 overflow-hidden rounded-sm border-solid border border-purple-800 mx-2">
      {verificationError !== "" && (
        <div className="text-red-500 text-center">
          {verificationError}
          <span
            className="absolute top-1 right-1 text-red-500 cursor-pointer text-xl"
            onClick={() => setVerificationError("")}
          >
            <CloseIcon />
          </span>
        </div>
      )}
      {verification === "sent" && (
        <div className="text-purple-800 flex flex-col sm:flex-row gap-y-2 text-center items-center justify-around gap-x-4">
          {translations.page.authValidation.verificationSent}
          <button
            className="border-solid border border-purple-800 text-purple-800 rounded-md px-2 py-0.5 font-semibold disabled:opacity-75"
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
