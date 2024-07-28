"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TOffer, TProduct } from "@/@types/general";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { CloseIcon, LoadingIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthProvider } from "@/providers/AuthProvider";
import { DeclineView } from "@/app/[lang]/(client)/profile/_components/OfferView/DeclineView";
import { AcceptView } from "@/app/[lang]/(client)/profile/_components/OfferView/AcceptView";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useUserNotifications } from "@/hooks/useUserNotifications";
import { OfferViewSkeleton } from "@/app/[lang]/(client)/profile/_components/OfferView/OfferViewSkeleton";

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
  const { currentUser } = useAuthProvider();
  const [answer, setAnswer] = useState<TAnswer_Enum>(TAnswer_Enum.NONE);
  const translations = useDictionary();
  const [loading, setLoading] = useState<boolean>(false);
  const [offerItem, setOfferItem] = useState<TProduct | undefined>();
  const { notifications } = useUserNotifications();

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
      const offerNoteId = notifications.find(
        (note) => note.offer.id === offer.id
      )?.id;

      if (currentUser == null || offer == null || offerNoteId == null) return;

      const noteDoc = doc(db, "notifications", offerNoteId);
      return await deleteDoc(noteDoc);
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
    <div
      className={`max-w-[90%] md:max-w-[50%] 2xl:max-w-[40%] bg-white dark:bg-gray-900 border-solid border border-purple-800 rounded-md px-3 sm:px-6 py-9 flex flex-col gap-6 overflow-x-hidden overflow-y-auto scroll-sm relative transition-all ease-linear duration-200 ${
        answer === TAnswer_Enum.CONFIRM || answer === TAnswer_Enum.DECLINE
          ? `${window.screen.height > 700 ? "h-[420px]" : "h-[80dvh]"}`
          : `${window.screen.height > 700 ? "h-[500px]" : "h-[90dvh]"}`
      }`}
    >
      {!loading && (
        <span
          className="absolute top-1 right-1 text-2xl cursor-pointer hover:opacity-75 duration-100 hover:text-purple-700 hover:bg-white bg-purple-800 rounded-full"
          onClick={closeModal}
        >
          <CloseIcon />
        </span>
      )}
      {loading ? (
        <OfferViewSkeleton />
      ) : offerItem ? (
        <>
          <div className="w-full relative aspect-video select-none shrink-0">
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
            <div className="h-full flex items-end">
              <AcceptView
                closeModal={closeModal}
                offer={offer}
                onCancel={() => setAnswer(TAnswer_Enum.NONE)}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-y-3">
                <h3 className="text-sm sm:text-lg">
                  {lang === "ka"
                    ? `${offer.from} -მ შემოგთავაზათ თანხა "${offerItem.name}" -ის სანაცვლოდ`
                    : `${offer.from} made an offer for "${offerItem.name}"`}
                </h3>
                <div className="font-semibold text-gray-300 text-2xl">
                  {formatCurrency(offer.offeredInCents / 100)}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
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
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
