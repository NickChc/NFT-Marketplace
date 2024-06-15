"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { useGlobalProvider } from "@/providers/GlobalProvider";

interface DeleteAccountProps {
  text: {
    delete: string;
    deleteAccount: string;
    cantDeleteAcc: string;
  };
}

export function DeleteAccount({ text }: DeleteAccountProps) {
  const { setDeleteUser } = useGlobalProvider();
  const { currentUser } = useAuthProvider();

  if (currentUser == null) return null;

  return (
    <div className="mx-auto w-full  flex flex-col sm:flex-row p-3 pt-9 items-center justify-end gap-4">
      {currentUser.ownings.length > 0 ? text.cantDeleteAcc : text.deleteAccount}
      <button
        disabled={currentUser.ownings.length > 0}
        className="w-full sm:w-auto border-solid border border-red-500 text-red-500 px-6 py-1 rounded-md hover:bg-red-500 hover:text-white duration-75 disabled:hover:bg-transparent disabled:hover:text-red-500 disabled:opacity-75"
        onClick={() => setDeleteUser(currentUser)}
      >
        {text.delete}
      </button>
    </div>
  );
}
