"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { TProduct } from "@/@types/general";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { stopSelling } from "@/app/[lang]/(client)/_actions/product";
import { useUserCollection } from "@/hooks/useUserCollection";
import { DualButton } from "@/app/[lang]/_components/DualButton";

interface ConfirmStopSellingProps {
  lang: TLocale;
  closeModal: () => void;
  stopSellingProduct: TProduct | null;
}

export function ConfirmStopSelling({
  lang,
  closeModal,
}: ConfirmStopSellingProps) {
  const [mounted, setMounted] = useState<boolean>(false);
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

  useEffect(() => {
    if (stopSellingProduct == null) return;

    setMounted(true);
  }, [stopSellingProduct]);

  if (stopSellingProduct == null) return null;

  return (
    <div
      className={`bg-[#fff] p-3 sm:p-6 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-purple-800 transition-display duration-300 start-style-b-t ${
        mounted ? "block" : "hidden"
      }`}
    >
      <h4 className="font-semibold sm:text-lg md:text-xl text-center">
        {lang === "ka"
          ? `დარწმუნებული ხართ, რომ აღარ გსურთ ${stopSellingProduct?.name} -ის გაყიდვა?`
          : `Are you sure you no longer want to sell ${stopSellingProduct?.name} ?`}
      </h4>
      <div className="flex gap-4 md:gap-9 mt-6 justify-center">
        <DualButton size="large" disabled={loading} onClick={handleStopSelling}>
          {translations.page.agree}
        </DualButton>
        <DualButton size="large" variation="secondary" onClick={closeModal}>
          {translations.page.cancel}
        </DualButton>
      </div>
    </div>
  );
}
