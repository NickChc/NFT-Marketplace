"use client";

import { TProduct } from "@/@types/general";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";

interface OfferFormProps {
  closeModal: () => void;
  offerItem: TProduct | null;
}

export function OfferForm({ closeModal, offerItem }: OfferFormProps) {
  const translations = useDictionary();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [price, setPrice] = useState<string>(
    `${(offerItem?.owner?.paidInCents || 0) / 100 + 1}`
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setErrorMessage("");

    if (/^\d*$/.test(value) && value.length < 7) {
      setPrice(value.replace(/^0+(?!$)/, "") || "0");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);
      if (offerItem == null || offerItem.owner == null) return;
      if (Number(price) < offerItem.owner.paidInCents) {
        setErrorMessage(translations.page.lowerThanMarketPrice);
        return;
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (offerItem == null) return null;

  return (
    <form
      className="w-[90%] sm:w-[50%] md:w-auto md:min-w-[500px] p-6 bg-white dark:bg-gray-900 flex flex-col gap-4 border-solid border border-purple-700 rounded-md"
      onSubmit={handleSubmit}
    >
      <FormInput
        value={price}
        onChange={handleChange}
        name="price"
        label={translations.page.offerAmount}
      />
      <div>
        {translations.page.ownerPaid}{" "}
        {formatCurrency((offerItem.owner?.paidInCents || 0) / 100)}
      </div>
      {errorMessage !== "" && (
        <div className="text-red-500">{errorMessage}</div>
      )}

      <button
        disabled={loading || errorMessage !== ""}
        className="bg-purple-800 px-2 py-1 w-full rounded-sm text-white hover:opacity-75 disabled:cursor-default disabled:opacity-75"
        type="submit"
      >
        {loading
          ? `${translations.page.processing}...`
          : `${translations.page.offer} ${formatCurrency(Number(price) || 0)}`}
      </button>
      <button
        className="bg-white px-2 py-1 border-solid border rounded-sm border-purple-800 text-purple-800"
        type="button"
        onClick={closeModal}
      >
        {translations.page.cancel}
      </button>
    </form>
  );
}
