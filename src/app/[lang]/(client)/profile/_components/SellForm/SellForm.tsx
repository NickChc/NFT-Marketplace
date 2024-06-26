"use client";

import { TProduct } from "@/@types/general";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { sellProduct } from "@/app/[lang]/(client)/_actions/product";
import { auth } from "@/firebase";
import { useUserCollection } from "@/hooks/useUserCollection";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useAuthProvider } from "@/providers/AuthProvider";

interface SellFormProps {
  product: TProduct | null;
  closeModal: () => void;
}

export function SellForm({ product, closeModal }: SellFormProps) {
  const [price, setPrice] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const translations = useDictionary();
  const { getUserCollection } = useUserCollection();
  const { getCurrentUser } = useAuthProvider();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setError("");

    if (/^\d*$/.test(value) && value.length < 7) {
      setPrice(value.replace(/^0+(?!$)/, "") || "0");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (product == null || auth.currentUser?.email == null) return;
      if (Number(price) < 1) return setError(translations.page.priceTooLow);
      setLoading(true);
      await sellProduct(Number(price) * 100, product, auth.currentUser.email);
      await getCurrentUser(undefined, auth.currentUser.uid);
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (product == null) return null;

  return (
    <form
      className="w-[90%] sm:w-[50%] md:w-auto md:min-w-80 p-3 bg-white dark:bg-gray-900 flex flex-col gap-4 border-solid border border-purple-700 rounded-md"
      onSubmit={handleSubmit}
    >
      <FormInput
        value={price}
        onChange={handleChange}
        name="price"
        label={translations.page.selectPrice}
      />
      {error !== "" && <div className="text-red-500">{error}</div>}

      <DualButton disabled={loading || error !== ""} type="submit">
        {loading
          ? `${translations.page.processing}...`
          : `${translations.page.sellFor} ${formatCurrency(
              Number(price) || 0
            )}`}
      </DualButton>
      <DualButton variation="secondary" type="button" onClick={closeModal}>
        {translations.page.cancel}
      </DualButton>
    </form>
  );
}
