"use client";

import { TOffer } from "@/@types/general";
import { acceptOffer } from "@/actions/orders";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useFormState } from "react-dom";
import { SubmitOfferAnswer } from "@/app/[lang]/(client)/profile/_components/OfferView/SubmitOfferAnswer";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";

interface AcceptViewProps {
  offer: TOffer;
  onCancel: () => void;
  closeModal: () => void;
}

export function AcceptView({ offer, onCancel, closeModal }: AcceptViewProps) {
  const translations = useDictionary();
  const { currentUser, getCurrentUser } = useAuthProvider();
  const [message, setMessage] = useState<string>("");
  const [data, action] = useFormState(acceptOffer.bind(null, offer), {
    message: "",
  });

  useEffect(() => {
    if (currentUser == null) return;

    if (data.message === "success") {
      data.message = "";
      closeModal();
      getCurrentUser(undefined, currentUser.uid);
    } else if (data.message === "no_owner") {
      getCurrentUser(undefined, currentUser.uid);
      setMessage(translations.page.noSenderAcc);
    }
  }, [data]);

  return (
    <form action={action} className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-y-3">
        <div>{translations.page.acceptAssurance}? </div>
        <h3 className="font-semibold opacity-80 text-2xl my-2">
          {formatCurrency(offer.offeredInCents / 100)}
        </h3>
      </div>
      {message !== "" ? (
        <>
          <div className="text-alert">{message}</div>
          <div className="mt-4">
            <DualButton onClick={closeModal}>{translations.page.ok}</DualButton>
          </div>
        </>
      ) : (
        <div className="flex justify-between gap-3 items-center mt-3">
          <SubmitOfferAnswer text={translations.page.yes} />
          <DualButton variation="secondary" type="button" onClick={onCancel}>
            {translations.page.no}
          </DualButton>
        </div>
      )}
    </form>
  );
}
