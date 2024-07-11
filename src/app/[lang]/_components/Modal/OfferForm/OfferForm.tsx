"use client";

import { TProduct } from "@/@types/general";
import { sendOfferEmail } from "@/actions/orders";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { useFormState } from "react-dom";
import { OfferSubmitButton } from "@/app/[lang]/_components/Modal/OfferForm/OfferSubmitButton";
import { useAuthProvider } from "@/providers/AuthProvider";
import { DualButton } from "../../DualButton";

interface OfferFormProps {
  closeModal: () => void;
  offerItem: TProduct | null;
}

export interface TSenfOfferEmailReturnData {
  error?: string;
  message?: string;
}

export function OfferForm({ closeModal, offerItem }: OfferFormProps) {
  const { currentUser } = useAuthProvider();
  const translations = useDictionary();
  const [data, action] = useFormState(
    sendOfferEmail.bind(null, currentUser, offerItem),
    {}
  );

  const [price, setPrice] = useState<string>(
    `${(offerItem?.originalPriceInCents || 0) / 100 + 100}`
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    data.error = undefined;

    if (/^\d*$/.test(value) && value.length < 7) {
      setPrice(value.replace(/^0+(?!$)/, "") || "0");
    }
  }

  if (offerItem == null) return null;

  return (
    <form
      className="w-[90%] sm:w-[50%] md:w-auto md:min-w-[500px] p-3 sm:p-6 bg-white dark:bg-gray-900 flex flex-col gap-4 border-solid border border-purple-700 rounded-md"
      action={action}
    >
      {data.message === "email_success" ? (
        <div className="my-3">{translations.page.offerSent}</div>
      ) : (
        <>
          <FormInput
            value={price}
            onChange={handleChange}
            name="price"
            label={translations.page.offerAmount}
          />
          <div>
            {translations.page.marketPriceIs}{" "}
            {formatCurrency((offerItem.originalPriceInCents || 0) / 100)}
          </div>
        </>
      )}
      {data.error && (
        <div className="text-red-500">
          {data.error === "price_error"
            ? translations.page.lowerThanMarketPrice
            : translations.page.problemOccuredTryAgain}
        </div>
      )}
      {data.message === "email_success" ? (
        <DualButton variation="secondary" type="button" onClick={closeModal}>
          {translations.page.gotIt}
        </DualButton>
      ) : (
        <>
          <OfferSubmitButton
            error={
              data.error?.toLowerCase().includes("try again")
                ? data.error
                : undefined
            }
            price={Number(price)}
          />
          <DualButton variation="secondary" type="button" onClick={closeModal}>
            {translations.page.cancel}
          </DualButton>
        </>
      )}
    </form>
  );
}
