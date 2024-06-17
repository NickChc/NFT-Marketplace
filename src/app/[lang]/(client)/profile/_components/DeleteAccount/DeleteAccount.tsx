"use client";

import { auth } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { useState } from "react";

interface DeleteAccountProps {
  text: {
    delete: string;
    deleteAccount: string;
    cantDeleteAcc: string;
  };
}

export function DeleteAccount({ text }: DeleteAccountProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setDeleteUser } = useGlobalProvider();
  const { currentUser, reauthenticate } = useAuthProvider();

  const translations = useDictionary();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setErrorMessage("");
      if (auth.currentUser == null) return;
      const result = await reauthenticate(auth.currentUser);
      if (result === false) {
        setErrorMessage(translations.page.couldntReauth);
      } else {
        setDeleteUser(currentUser);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  if (currentUser == null) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full flex flex-col sm:flex-row p-3 pt-9 items-center justify-end gap-4"
      >
        {currentUser.ownings.length > 0
          ? text.cantDeleteAcc
          : text.deleteAccount}
        <button
          type="submit"
          disabled={currentUser.ownings.length > 0}
          className="w-full sm:w-auto border-solid border border-red-500 text-red-500 px-6 py-1 rounded-md hover:bg-red-500 hover:text-white duration-75 disabled:hover:bg-transparent disabled:hover:text-red-500 disabled:opacity-75"
        >
          {text.delete}
        </button>
      </form>
      {errorMessage !== "" && (
        <div className="text-red-500 p-1 text-center sm:text-end">
          {errorMessage}
        </div>
      )}
    </>
  );
}
