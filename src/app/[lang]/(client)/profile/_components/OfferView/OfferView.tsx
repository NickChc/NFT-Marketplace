"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TOffer, TProduct } from "@/@types/general";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { CloseIcon, LoadingIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthProvider } from "@/providers/AuthProvider";
import { DeclineView } from "@/app/[lang]/(client)/profile/_components/OfferView/DeclineView";
import { AcceptView } from "@/app/[lang]/(client)/profile/_components/OfferView/AcceptView";
import { DualButton } from "@/app/[lang]/_components/DualButton";

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
  const { currentUser, setCurrentUser } = useAuthProvider();
  const [answer, setAnswer] = useState<TAnswer_Enum>(TAnswer_Enum.NONE);
  const translations = useDictionary();
  const [loading, setLoading] = useState<boolean>(false);
  const [offerItem, setOfferItem] = useState<TProduct | undefined>();

  async function fetchProduct(productId: string) {
    try {
      if (offer == null) return;
      setLoading(true);
      const product = await getProduct(productId);
      if (product == null) return closeModal();
      setOfferItem(product);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function viewOffer(offer: TOffer) {
    try {
      if (currentUser == null || offer == null || offer.seen) return;

      const userDoc = doc(db, "users", currentUser.id);
      await updateDoc(userDoc, {
        offers: currentUser.offers.map((userOffer) => {
          if (userOffer.id === offer.id) {
            return { ...userOffer, seen: true };
          } else {
            return userOffer;
          }
        }),
      });
      setCurrentUser((prev) => {
        if (prev == null) return null;

        return {
          ...prev,
          offers: prev.offers.map((userOffer) => {
            if (userOffer.id === offer.id) {
              return { ...userOffer, seen: true };
            } else {
              return userOffer;
            }
          }),
        };
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (offer == null) return;
    fetchProduct(offer.productId);
    viewOffer(offer);
  }, [offer]);

  if (offer == null) return null;

  return (
    <div className="max-w-[90%] md:max-w-[50%] 2xl:max-w-[40%] bg-white dark:bg-gray-900 border-solid border border-purple-800 rounded-md p-3 sm:p-6 pt-7 flex flex-col gap-6 overflow-hidden relative">
      {!loading && (
        <span
          className="absolute top-1 right-1 text-lg sm:text-xl cursor-pointer hover:opacity-75 duration-100 hover:text-purple-700 hover:bg-white bg-purple-800 rounded-full"
          onClick={closeModal}
        >
          <CloseIcon />
        </span>
      )}
      {loading ? (
        <LoadingIcon className="text-4xl animate-spin mx-auto" />
      ) : offerItem ? (
        <>
          <div className="w-full relative aspect-video select-none">
            <Image
              src={offerItem.imagePath}
              alt={offerItem.name}
              fill
              objectFit="cover"
            />
          </div>
          {answer === TAnswer_Enum.DECLINE ? (
            <DeclineView
              offerItem={offerItem}
              onCancel={() => setAnswer(TAnswer_Enum.NONE)}
              closeModal={closeModal}
              offer={offer}
            />
          ) : answer === TAnswer_Enum.CONFIRM ? (
            <AcceptView
              closeModal={closeModal}
              offer={offer}
              onCancel={() => setAnswer(TAnswer_Enum.NONE)}
            />
          ) : (
            <>
              <h3 className="text-sm sm:text-lg">
                {lang === "ka"
                  ? `${offer.from} -მ შემოგთავაზათ თანხა ${offerItem.name} -ის სანაცვლოდ`
                  : `${offer.from} made an offer for ${offerItem.name}`}
              </h3>
              <div className="font-semibold text-gray-300 text-2xl">
                {formatCurrency(offer.offeredInCents / 100)}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <DualButton onClick={() => setAnswer(TAnswer_Enum.CONFIRM)}>
                  {translations.page.accept}
                </DualButton>
                <DualButton
                  variation="secondary"
                  onClick={() => setAnswer(TAnswer_Enum.DECLINE)}
                >
                  {translations.page.decline}
                </DualButton>
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
