"use client";

import { CloseIcon } from "@/assets/icons";

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
  return (
    <div className="bg-gray-300 flex flex-col items-stretch gap-y-4 absolute bottom-14 right-0 left-0 p-4 overflow-hidden rounded-sm border-solid border border-purple-800">
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
        <div className="text-black flex items-center justify-around gap-x-4">
          Email verification sent to your inbox, please verify to continue
          <button
            className="border-solid border border-purple-800 text-purple-800 rounded-md px-2 py-0.5 font-semibold disabled:opacity-75"
            disabled={loadingVerify}
            onClick={(e) => {
              e.stopPropagation();
              confirmVerified();
            }}
          >
            {loadingVerify ? "CHECKING..." : "VERIFIED!"}
          </button>
        </div>
      )}
    </div>
  );
}
