"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";

interface ForgotPasswordFormPopupProps {
  error: string;
  closePopup: () => void;
  lang: TLocale;
  resend: () => Promise<void>;
}

export function ForgotPasswordFormPopup({
  error,
  closePopup,
  lang,
  resend,
}: ForgotPasswordFormPopupProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const translations = useDictionary();
  const { page } = translations;

  async function handleResend() {
    try {
      setLoading(true);
      await resend();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-300 relative flex flex-col items-stretch gap-y-4 w-full sm:mt-9 p-4 overflow-hidden rounded-sm border-solid border border-purple-800">
      {error !== "" ? (
        <div className="text-red-500 text-center">
          {error}
          <span
            className="absolute top-1 right-1 text-red-500 cursor-pointer text-xl"
            onClick={closePopup}
          >
            <CloseIcon />
          </span>
        </div>
      ) : (
        <div className="text-purple-800 flex flex-col gap-y-2 sm:flex-row text-center items-center justify-between">
          {translations.page.passwordRecoverySent}
          <div className="flex flex-col gap-y-2 items-stretch w-40">
            <button
              type="button"
              disabled={loading}
              onClick={handleResend}
              className="border-solid border border-purple-800 text-purple-800 rounded-md px-2 py-0.5 font-semibold disabled:opacity-75"
            >
              {loading ? `${page.sending}...` : page.sendAgain}
            </button>
            <button
              type="button"
              className="flex border-solid border border-purple-800 text-purple-800 rounded-md  font-semibold disabled:opacity-75 overflow-hidden"
            >
              <Link
                className="px-2 py-0.5 w-full"
                href={`/${lang}/auth/sign-in`}
              >
                {page.done}
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
