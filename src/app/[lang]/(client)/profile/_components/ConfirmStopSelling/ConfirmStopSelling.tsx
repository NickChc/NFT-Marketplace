"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { TProduct } from "@/@types/general";
import { useState } from "react";
import { auth } from "@/firebase";
import { stopSelling } from "../../../_actions/product";
import { useUserCollection } from "@/hooks/useUserCollection";

interface ConfirmStopSellingProps {
  lang: TLocale;
  closeModal: () => void;
  stopSellingProduct: TProduct | null;
}

export function ConfirmStopSelling({
  lang,
  closeModal,
}: ConfirmStopSellingProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const translations = useDictionary();
  const { stopSellingProduct } = useGlobalProvider();
  const { getUserCollection } = useUserCollection();

  async function handleStopSelling() {
    try {
      if (stopSellingProduct == null || auth.currentUser?.email == null) return;
      setLoading(true);
      await stopSelling(stopSellingProduct, auth.currentUser.email);
      getUserCollection();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      closeModal();
    }
  }

  if (stopSellingProduct == null) return null;

  return (
    <div className="bg-[#fff] p-3 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-purple-800">
      <h4 className="font-semibold sm:text-lg md:text-xl text-center">
        {lang === "ka"
          ? `დარწმუნებული ხართ, რომ აღარ გსურთ ${stopSellingProduct.name} -ის გაყიდვა?`
          : `Are you sure you no longer want to sell ${stopSellingProduct.name} ?`}
      </h4>
      <div className="flex gap-4 md:gap-9 mt-6 justify-center">
        <button
          className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 bg-purple-800 text-white rounded-md disabled:opacity-75 disabled:cursor-default"
          disabled={loading}
          onClick={handleStopSelling}
        >
          {translations.page.agree}
        </button>
        <button
          className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 rounded-md text-purple-800"
          onClick={closeModal}
        >
          {translations.page.cancel}
        </button>
      </div>
    </div>
  );
}
