"use client";

import { TOffer } from "@/@types/general";
import OfferRejectEmail from "@/email/OfferRejectEmail";
import { db } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { useAuthProvider } from "@/providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Resend } from "resend";

interface DeclineViewProps {
  offer: TOffer;
  offerItem: {
    name: string;
    description: string;
    imagePath: string;
  };
  closeModal: () => void;
  onCancel: () => void;
}

export function DeclineView({
  offer,
  offerItem,
  closeModal,
  onCancel,
}: DeclineViewProps) {
  const translations = useDictionary();
  const { currentUser, getCurrentUser } = useAuthProvider();
  const [loading, setLoading] = useState<boolean>(false);

  const resend = new Resend(process.env.RESEND_API_KEY as string);

  async function sendRejectEmail() {
    try {
      const data = await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: offer.from,
        subject: "Offer",
        react: (
          <OfferRejectEmail
            from={`Support - NFT_Marketplace@gmail.com`}
            offer={offer}
            offerItem={offerItem}
            createdAt={new Date(Date.now())}
          />
        ),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleDecline() {
    try {
      if (currentUser == null || offer == null) return;
      setLoading(true);
      const userDoc = doc(db, "users", currentUser.id);

      await updateDoc(userDoc, {
        offers: currentUser.offers.filter(
          (userOffer) => userOffer.id !== offer.id
        ),
      });
      getCurrentUser(undefined, currentUser.uid);
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>{translations.page.declineAssurance}?</div>
      <div className="flex items-center justify-between gap-3">
        <button
          className="disabled:opacity-75 disabled:cursor-default w-full px-2 py-1 rounded-md border-solid border border-purple-800 bg-purple-800 hover:opacity-75 duration-100"
          disabled={loading}
          onClick={handleDecline}
        >
          {translations.page.yes}
        </button>
        <button
          className="w-full px-2 py-1 rounded-md border-solid border border-purple-800 hover:opacity-75 duration-100 text-purple-800 bg-white"
          onClick={onCancel}
        >
          {translations.page.no}
        </button>
      </div>
    </>
  );
}
