"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";
import { useState } from "react";
import { TProduct } from "@/@types/general";
import { toggleBidding } from "../../../_actions/product";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useUserCollection } from "@/hooks/useUserCollection";

interface ConfirmBiddingToggleProps {
  lang: TLocale;
  closeModal: () => void;
  bidItem: TProduct | null;
}

export function ConfirmBiddingToggle({
  lang,
  closeModal,
  bidItem,
}: ConfirmBiddingToggleProps) {
  const translations = useDictionary();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthProvider();
  const { getUserCollection } = useUserCollection();

  async function handleBidToggle() {
    try {
      setLoading(true);
      if (bidItem == null || currentUser?.email == null) return;
      await toggleBidding(bidItem, currentUser.email);
      getUserCollection();
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (bidItem == null) return null;

  return (
    <div className="bg-[#fff] p-6 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-purple-800">
      <h4 className="font-semibold sm:text-lg md:text-xl text-center">
        {lang === "ka"
          ? `სხვა მომხმარებლებს ${
              bidItem.openForBidding ? "აღარ" : ""
            } შეეძლებათ შემოგთავაზონ თანხა ${bidItem.name} -ის სანაცვლოდ.`
          : `Other users will ${
              bidItem.openForBidding ? "no longer" : ""
            } be able to offer you money for ${bidItem.name}`}
      </h4>
      <div className="flex gap-4 md:gap-9 mt-6 justify-center">
        <button
          className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 bg-purple-800 text-white rounded-md disabled:opacity-75 disabled:cursor-default"
          disabled={loading}
          onClick={handleBidToggle}
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