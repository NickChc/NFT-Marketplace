"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { useGlobalProvider } from "@/providers/GlobalProvider";

interface DeleteAccountProps {
  text: {
    delete: string;
    deleteAccount: string;
  };
}

export function DeleteAccount({ text }: DeleteAccountProps) {
  const { setDeleteUser } = useGlobalProvider();
  const { currentUser } = useAuthProvider();

  if (currentUser == null) return null;

  return (
    <div className="absolute w-1/3 right-0 bottom-9 flex items-center justify-between">
      {text.deleteAccount}
      <button
        disabled={currentUser.ownings?.length > 0}
        className="border-solid border border-red-500 text-red-500 px-6 py-1 rounded-md hover:bg-red-500 hover:text-white duration-75 disabled:hover:bg-transparent disabled:hover:text-red-500 disabled:opacity-75"
        onClick={() => setDeleteUser(currentUser)}
      >
        {text.delete}
      </button>
    </div>
  );
}
