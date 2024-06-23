"use client";

import { TProduct } from "@/@types/general";
import { auth } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useAuthProvider } from "@/providers/AuthProvider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { TLocale } from "../../../../../../../../i18n.config";
import { DualButton } from "@/app/[lang]/_components/DualButton";

interface FormProps {
  product: TProduct;
  lang: TLocale;
}

export function Form({ product, lang }: FormProps) {
  const translations = useDictionary();
  const { page } = translations;
  const { currentUser } = useAuthProvider();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (product.owner?.userId === currentUser?.id) {
        return setErrorMessage(page.alreadyOwn);
      }

      setLoading(true);

      if (auth.currentUser == null || stripe == null || elements == null)
        return;

      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${lang}/stripe/purchase-success`,
            payment_method_data: {
              billing_details: {
                email: auth.currentUser?.email!,
              },
            },
          },
        })
        .then(({ error }) => {
          if (
            error.type === "card_error" ||
            error.type === "validation_error"
          ) {
            if (error.message?.includes("card number is invalid")) {
              setErrorMessage(page.cardNumberInvalid);
            } else {
              setErrorMessage(error.message);
            }
          } else {
            setErrorMessage(page.problemOccuredTryAgain);
          }
        })
        .finally(() => setLoading(false));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <form
      className="mt-4 flex flex-col gap-4 text-2xl text-white dark:text-white pb-6"
      onSubmit={handleSubmit}
    >
      <div>
        <h2>{page.checkout}</h2>
        {errorMessage && (
          <div className="text-red-500 text-lg sm:text-xl md:text-2xl">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="mb-4">
        <PaymentElement className="bg-purple-800 p-3 rounded-md" />
      </div>
      <DualButton
        size="large"
        disabled={loading || stripe == null || elements == null}
      >
        {loading
          ? `${page.processing}...`
          : `${page.purchase} - ${formatCurrency(product.priceInCents / 100)}`}
      </DualButton>
    </form>
  );
}
