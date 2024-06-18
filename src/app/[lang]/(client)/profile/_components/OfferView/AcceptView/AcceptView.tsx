"use client";

import { TOffer } from "@/@types/general";
import { acceptOffer } from "@/actions/orders";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useFormState } from "react-dom";
import { SubmitOfferAnswer } from "../SubmitOfferAnswer";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useEffect } from "react";

interface AcceptViewProps {
  offer: TOffer;
  onCancel: () => void;
  closeModal: () => void;
}

export function AcceptView({ offer, onCancel, closeModal }: AcceptViewProps) {
  const translations = useDictionary();
  const { currentUser, getCurrentUser } = useAuthProvider();
  const [data, action] = useFormState(acceptOffer.bind(null, offer), {
    message: "",
  });

  useEffect(() => {
    if (data.message !== "success" || currentUser == null) return;
    data.message = "";
    closeModal();
    getCurrentUser(undefined, currentUser.uid);
  }, [data]);

  return (
    <form action={action}>
      <div>{translations.page.acceptAssurance}? </div>
      <h3 className="font-semibold opacity-80 text-2xl my-2">
        {formatCurrency(offer.offeredInCents / 100)}
      </h3>
      <div className="flex justify-between gap-3 items-center mt-3">
        <SubmitOfferAnswer text={translations.page.yes} />
        <DualButton variation="secondary" type="button" onClick={onCancel}>
          {translations.page.no}
        </DualButton>
      </div>
    </form>
  );
}
