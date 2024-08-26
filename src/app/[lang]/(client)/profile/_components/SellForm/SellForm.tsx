"use client";

import { TProduct } from "@/@types/general";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { sellProduct } from "@/app/[lang]/(client)/_actions/product";
import { auth } from "@/firebase";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useAuthProvider } from "@/providers/AuthProvider";
import Image from "next/image";
import { blurDataImage } from "@/config/general";

interface SellFormProps {
  product: TProduct | null;
  closeModal: () => void;
}

export function SellForm({ product, closeModal }: SellFormProps) {
  const [price, setPrice] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const translations = useDictionary();
  const [mounted, setMounted] = useState<boolean>(false);
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
      if (Number(price) < 1) {
        setError(translations.page.priceTooLow);
        return;
      }

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

  useEffect(() => {
    if (product == null) return;

    setMounted(true);
  }, [product]);

  if (product == null) return null;

  return (
    <form
      className={`w-[90%] sm:w-[50%] md:w-auto md:min-w-80 p-3 bg-custom-white dark:bg-add-2 flex-col gap-4 border-solid border border-add rounded-md transition-display duration-300 start-style-b-t max-h-[90vh] overflow-y-auto ${
        mounted ? "flex" : "hidden"
      }`}
      onSubmit={handleSubmit}
    >
      <div className="relative aspect-video w-[85%] mt-1 mx-auto shrink-0">
        <Image
          placeholder="blur"
          blurDataURL={blurDataImage}
          onError={(e) => {
            console.log("Failed to load image", e);
            e.currentTarget.src =
              "../../../../../assets/images/PlaceholderImg.webp";
          }}
          src={product.imagePath}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <FormInput
        value={price}
        onChange={handleChange}
        name="price"
        label={translations.page.selectPrice}
      />
      {error !== "" && <div className="text-alert">{error}</div>}
      <div>
        {translations.page.itemWasPurchasedFor} -{" "}
        {formatCurrency(product.owner?.paidInCents || 0)}
      </div>

      {product.originalPriceInCents !== product.owner?.paidInCents && (
        <div>
          {translations.page.returnForOgPrice} -{" "}
          {formatCurrency(product.originalPriceInCents)}
        </div>
      )}

      <DualButton
        disabled={loading || error !== ""}
        loadSpinnerText={loading ? translations.page.processing : undefined}
        type="submit"
      >
        {translations.page.sellFor} {formatCurrency(Number(price) || 0)}
      </DualButton>
      <DualButton variation="secondary" type="button" onClick={closeModal}>
        {translations.page.cancel}
      </DualButton>
    </form>
  );
}
