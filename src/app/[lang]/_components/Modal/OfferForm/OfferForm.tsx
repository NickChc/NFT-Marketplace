"use client";

import { TProduct } from "@/@types/general";
import { sendOfferEmail } from "@/actions/orders";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { OfferSubmitButton } from "@/app/[lang]/_components/Modal/OfferForm/OfferSubmitButton";
import { useAuthProvider } from "@/providers/AuthProvider";
import { DualButton } from "../../DualButton";
import Image from "next/image";

interface OfferFormProps {
  closeModal: () => void;
  offerItem: TProduct | null;
}

export interface TSenfOfferEmailReturnData {
  error?: string;
  message?: string;
}

export function OfferForm({ closeModal, offerItem }: OfferFormProps) {
  const [mounted, setMounted] = useState<boolean>(false);
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

  useEffect(() => {
    if (offerItem == null) return;

    setMounted(true);
  }, [offerItem]);

  if (offerItem == null) return null;

  return (
    <form
      className={`w-[90%] sm:w-[50%] md:w-auto md:min-w-[500px] p-3 sm:p-6 bg-white dark:bg-gray-900 flex-col gap-4 border-solid border border-purple-700 rounded-md transition-display duration-300 start-style-b-t max-h-[90dvh] overflow-auto z-50 ${
        mounted ? "flex" : "hidden"
      }`}
      action={action}
    >
      {data.message === "email_success" ? (
        <div className="my-3">{translations.page.offerSent}</div>
      ) : (
        <>
          <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl truncate shrink-0">
            {offerItem.name}
          </h2>
          <div className="relative w-full aspect-video mx-auto shrink-0">
            <Image
              src={offerItem.imagePath}
              alt={offerItem.name}
              fill
              objectFit="cover"
            />
          </div>
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
