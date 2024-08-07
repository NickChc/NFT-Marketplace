"use client";

import { TOffer } from "@/@types/general";
import { declineOffer } from "@/actions/orders";
import { SubmitBtn } from "@/components/SubmitBtn";
import OfferRejectEmail from "@/email/OfferRejectEmail";
import { db } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { useAuthProvider } from "@/providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { useFormState } from "react-dom";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { SubmitOfferAnswer } from "@/app/[lang]/(client)/profile/_components/OfferView/SubmitOfferAnswer";

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

export function DeclineView({ offer, closeModal, onCancel }: DeclineViewProps) {
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
    <div className="h-full flex flex-col justify-between">
      <div>{translations.page.declineAssurance}?</div>
      <form
        action={action}
        className="flex items-center justify-between gap-3 mt-3"
      >
        <SubmitOfferAnswer
          text={translations.page.yes}
          onClick={handleDecline}
        />
        <DualButton variation="secondary" type="button" onClick={onCancel}>
          {translations.page.no}
        </DualButton>
      </form>
    </div>
  );
}
