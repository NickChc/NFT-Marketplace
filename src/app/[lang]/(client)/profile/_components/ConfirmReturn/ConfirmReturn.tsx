"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useEffect, useState } from "react";
import { TProduct } from "@/@types/general";
import { useAuthProvider } from "@/providers/AuthProvider";
import { returnProduct } from "@/app/[lang]/(client)/_actions/product";
import { useDictionary } from "@/hooks/useDictionary";
import { DualButton } from "@/app/[lang]/_components/DualButton";

interface ConfirmReturnProps {
  returnItem: TProduct | null;
  closeModal: () => void;
  lang: TLocale;
}

export function ConfirmReturn({
  returnItem,
  closeModal,
  lang,
}: ConfirmReturnProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser, getCurrentUser } = useAuthProvider();
  const translations = useDictionary();

  async function handleReturn() {
    try {
      if (currentUser == null || returnItem == null) return;
      setLoading(true);
      await returnProduct(returnItem, currentUser.email);
      getCurrentUser(undefined, currentUser.uid);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      closeModal();
    }
  }

  useEffect(() => {
    if (returnItem == null) return;

    setMounted(true);
  }, [returnItem]);

  if (returnItem == null) return null;

  return (
    <div
      className={`bg-[#fff] p-6 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-purple-800 transition-display duration-300 start-style-b-t ${
        mounted ? "block" : "hidden"
      }`}
    >
      <h4 className="font-semibold sm:text-lg md:text-xl text-center">
        {lang === "ka"
          ? `თქვენ დაგიბრუნდებათ თანხა და აღარ იქნებით ${returnItem?.name} -ის მფლობელი.`
          : `You will no longer own ${returnItem?.name} and money will be refunded to
        you.`}
      </h4>
      <div className="flex gap-4 md:gap-9 mt-6 justify-center">
        <DualButton size="large" disabled={loading} onClick={handleReturn}>
          {translations.page.agree}
        </DualButton>
        <DualButton size="large" variation="secondary" onClick={closeModal}>
          {translations.page.cancel}
        </DualButton>
      </div>
    </div>
  );
}
