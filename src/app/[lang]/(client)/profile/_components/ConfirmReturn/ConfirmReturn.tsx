"use client";

import { useState } from "react";
import { TProduct } from "@/@types/general";
import { useAuthProvider } from "@/providers/AuthProvider";
import { returnProduct } from "@/app/[lang]/(client)/_actions/product";
import { useUserCollection } from "@/hooks/useUserCollection";
import { useDictionary } from "@/hooks/useDictionary";
import { TLocale } from "../../../../../../../i18n.config";

interface ConfirmReturnProps {
  returnItem: TProduct;
  closeModal: () => void;
  lang: TLocale;
}

export function ConfirmReturn({
  returnItem,
  closeModal,
  lang,
}: ConfirmReturnProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAuthProvider();
  const { getUserCollection } = useUserCollection();
  const translations = useDictionary();

  async function handleReturn() {
    try {
      if (currentUser == null) return;
      setLoading(true);
      await returnProduct(returnItem, currentUser.email);
      getUserCollection();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      closeModal();
    }
  }

  return (
    <div className="bg-[#fff] p-3 text-black w-[90%] sm:w-auto rounded-sm">
      <h4 className="font-semibold sm:text-lg md:text-xl text-center">
        {lang === "ka"
          ? `თქვენ დაგიბრუნდებათ თანხა და აღარ იქნებით ${returnItem.name} -ის მფლობელი.`
          : `You will no longer own ${returnItem.name} and money will be refunded to
        you.`}
      </h4>
      <div className="flex gap-4 md:gap-9 mt-6 justify-center">
        <button
          className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 bg-purple-800 text-white rounded-md disabled:opacity-75 disabled:cursor-default"
          disabled={loading}
          onClick={handleReturn}
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
