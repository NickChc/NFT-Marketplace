"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { formatCurrency } from "@/lib/formatters";
import { useDictionary } from "@/hooks/useDictionary";
import { useGlobalProvider } from "@/providers/GlobalProvider";

export function ProfileData() {
  const { currentUser } = useAuthProvider();
  const { setUpdateUser } = useGlobalProvider();
  const translations = useDictionary();

  if (currentUser == null) return null;

  return (
    <div className="flex flex-col gap-3 sm:text-xl md:text-2xl">
      <hr className="w-full my-3" />
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">{translations.page.name} -</span>{" "}
        {currentUser.name}
      </h3>
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">{translations.page.surname} -</span>{" "}
        {currentUser.surname}
      </h3>
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">{translations.page.email} -</span>{" "}
        {currentUser.email}
      </h3>

      {currentUser.isFrozen ? (
        <div className="text-red-500 mt-4 text-base sm:text-lg">
          {translations.page.frozenAccount}
        </div>
      ) : (
        <button
          className="text-white p-1 w-full bg-purple-800 font-semibold rounded-md duration-100 hover:opacity-75 mt-3"
          onClick={() => setUpdateUser(currentUser)}
        >
          {translations.page.edit}
        </button>
      )}
      <hr className="w-full my-3" />
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">{translations.page.totalSpent}</span> -{" "}
        {formatCurrency((currentUser?.spentInCents || 0) / 100)}
      </h3>
    </div>
  );
}
