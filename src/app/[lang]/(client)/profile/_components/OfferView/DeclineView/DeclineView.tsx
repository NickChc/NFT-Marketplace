"use client";

import { TOffer } from "@/@types/general";
import { declineOffer } from "@/actions/orders";
import { SubmitBtn } from "@/components/SubmitBtn";
import OfferRejectEmail from "@/email/OfferRejectEmail";
import { db } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { useAuthProvider } from "@/providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Resend } from "resend";
import { SubmitDeclineBtn } from "./SubmitDeclineBtn";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

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

  const [data, action] = useFormState(declineOffer.bind(null, offer), {
    message: "",
  });

  async function handleDecline() {
    try {
      if (currentUser == null || offer == null) return;
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
    }
  }

  return (
    <>
      <div>{translations.page.declineAssurance}?</div>
      <form action={action} className="flex items-center justify-between gap-3">
        <SubmitDeclineBtn
          text={translations.page.yes}
          onClick={handleDecline}
        />
        <button
          type="button"
          className="w-full px-2 py-1 rounded-md border-solid border border-purple-800 hover:opacity-75 duration-100 text-purple-800 bg-white"
          onClick={onCancel}
        >
          {translations.page.no}
        </button>
      </form>
    </>
  );
}
