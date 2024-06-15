"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TOffer, TProduct } from "@/@types/general";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { LoadingIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthProvider } from "@/providers/AuthProvider";
import { DeclineView } from "@/app/[lang]/(client)/profile/_components/OfferView/DeclineView";

interface OfferViewProps {
  offer: TOffer | null;
  lang: TLocale;
  closeModal: () => void;
}

enum TAnswer_Enum {
  NONE = "none",
  CONFIRM = "confirm",
  DECLINE = "decline",
}

export function OfferView({ offer, lang, closeModal }: OfferViewProps) {
  const { currentUser, getCurrentUser } = useAuthProvider();
  const [answer, setAnswer] = useState<TAnswer_Enum>(TAnswer_Enum.NONE);
  const translations = useDictionary();
  const [loading, setLoading] = useState<boolean>(false);
  const [offerItem, setOfferItem] = useState<TProduct | undefined>();

  async function fetchProduct(productId: string) {
    try {
      if (offer == null) return;
      setLoading(true);
      const product = await getProduct(productId);
      setOfferItem(product);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (offer == null) return;
    fetchProduct(offer.productId);
  }, [offer]);

  if (offer == null) return null;

  return (
    <div className="max-w-[90%] bg-white dark:bg-gray-900 border-solid border border-purple-800 rounded-md p-3 sm:p-6 flex flex-col gap-6">
      {loading ? (
        <LoadingIcon className="text-4xl animate-spin mx-auto" />
      ) : offerItem ? (
        <>
          <div className="w-full relative aspect-video">
            <Image
              src={offerItem.imagePath}
              alt={offerItem.name}
              fill
              objectFit="cover"
            />
          </div>
          {answer === TAnswer_Enum.DECLINE ? (
            <DeclineView
              onCancel={() => setAnswer(TAnswer_Enum.NONE)}
              closeModal={closeModal}
              offer={offer}
            />
          ) : answer === TAnswer_Enum.CONFIRM ? (
            <></>
          ) : (
            <>
              <h3 className="text-lg">
                {lang === "ka"
                  ? `${offer.from} -მ შემოგთავაზათ თანხა ${offerItem.name} -ის სანაცვლოდ`
                  : `${offer.from} made an offer for ${offerItem.name}`}
              </h3>
              <div className="font-semibold text-gray-300 text-2xl">
                {formatCurrency(offer.offeredInCents / 100)}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  className="px-2 py-1 border-solid border border-purple-800 rounded-md w-full bg-purple-800 hover:opacity-75 duration-100 "
                  onClick={() => setAnswer(TAnswer_Enum.CONFIRM)}
                >
                  {translations.page.accept}
                </button>
                <button
                  className="px-2 py-1 border-solid border border-purple-800 rounded-md w-full bg-white text-purple-800 hover:opacity-75 duration-100 "
                  onClick={() => setAnswer(TAnswer_Enum.DECLINE)}
                >
                  {translations.page.decline}
                </button>
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
