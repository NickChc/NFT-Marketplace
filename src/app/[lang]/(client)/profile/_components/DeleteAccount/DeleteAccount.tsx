"use client";

import { DeleteIcon } from "@/assets/icons";
import { auth } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { useUserCollection } from "@/hooks/useUserCollection";
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
  const { collection } = useUserCollection();

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
        {currentUser.ownings.length < 1 &&
        collection.length < 1 &&
        currentUser != null
          ? text.deleteAccount
          : text.cantDeleteAcc}
        <button
          type="submit"
          disabled={
            currentUser.ownings.length > 0 ||
            currentUser == null ||
            collection.length > 0
          }
          className="w-full sm:w-auto border-solid border border-alert text-alert px-6 py-1 rounded-md hover:bg-alert hover:text-custom-white duration-75 disabled:hover:bg-transparent disabled:hover:text-alert disabled:opacity-75"
        >
          <div className="inline-flex items-center gap-x-3">
            {text.delete}
            <DeleteIcon className="text-xl" />
          </div>
        </button>
      </form>
      {errorMessage !== "" && (
        <div className="text-alert p-1 text-center sm:text-end">
          {errorMessage}
        </div>
      )}
    </>
  );
}
