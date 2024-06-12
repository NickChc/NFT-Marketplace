"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TUser } from "@/@types/general";
import { useDictionary } from "@/hooks/useDictionary";
import { useState } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/firebase";

interface ConfirmDeleteAccProps {
  lang: TLocale;
  closeModal: () => void;
  deleteUser: TUser | null;
}

export function ConfirmDeleteAcc({
  lang,
  closeModal,
  deleteUser,
}: ConfirmDeleteAccProps) {
  const translations = useDictionary();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { handleUserDelete, handleLogOut } = useAuthProvider();

  async function handleDelete() {
    try {
      setLoading(true);
      setErrorMessage("");
      await handleUserDelete(auth.currentUser, () =>
        setErrorMessage(translations.page.reLoginToDelete)
      );
      closeModal();
      await handleLogOut();
     } catch (error: any) {
      console.log(error.message);
      if (error.message.incluides("requires-recent-login")) {
      }
    } finally {
      setLoading(false);
    }
  }

  if (deleteUser == null) return null;

  return (
    <div className="bg-[#fff] p-6 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-purple-800">
      <h4
        className={`font-semibold sm:text-lg md:text-xl text-center ${
          errorMessage !== "" ? "text-red-500" : ""
        }`}
      >
        {errorMessage === ""
          ? lang === "ka"
            ? `დარწმუნებული ხართ, რომ გსურთ ანგარიშის წაშლა?`
            : `Are you sure you want to delete your account?`
          : errorMessage}
      </h4>
      <div className="flex gap-4 md:gap-9 mt-6 justify-center">
        {errorMessage === "" && (
          <button
            className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-red-500 bg-red-500 text-white rounded-md disabled:opacity-75 disabled:cursor-default hover:opacity-75"
            disabled={loading}
            onClick={handleDelete}
          >
            {translations.page.agree}
          </button>
        )}
        <button
          className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 rounded-md text-purple-800 bg-gray-100"
          onClick={closeModal}
        >
          {translations.page.cancel}
        </button>
      </div>
    </div>
  );
}
