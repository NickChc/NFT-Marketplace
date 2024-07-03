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
import { useEffect, useState } from "react";
import { TLocale } from "../../../../../../../../i18n.config";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { CheckIcon, CopyIcon } from "@/assets/icons";

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
  const [copied, setCopied] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

      if (product.owner?.userId === currentUser?.id) {
        return setErrorMessage(page.alreadyOwn);
      }

      setLoading(true);

      if (
        auth.currentUser == null ||
        stripe == null ||
        elements == null ||
        currentUser?.isFrozen
      ) {
        return;
      }

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

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }
  }, [copied]);

  return (
    <form
      className="mt-4 flex flex-col gap-4 text-2xl text-white dark:text-white pb-6"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="flex flex-col sm:flex-row items-start gap-y-3 sm:items-center justify-between px-3">
          <h2>{page.checkout}</h2>
          <span
            className="flex items-center gap-x-3 cursor-pointer hover:text-purple-800 duration-150 hover:underline text-xl md:text-2xl"
            onClick={() => {
              navigator.clipboard.writeText("4242 4242 4242 4242");
              setCopied(true);
            }}
          >
            <CheckIcon
              className={`duration-200 transition-transform rounded-full ${
                copied ? "scale-100" : "absolute scale-0"
              }`}
            />
            <CopyIcon
              className={`duration-200 transition-transform ${
                copied ? "absolute scale-0" : "scale-100"
              }`}
            />{" "}
            4242 4242 4242 4242
          </span>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-lg sm:text-xl md:text-2xl">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="text-red-500">
        {currentUser?.isFrozen &&
          (lang === "ka"
            ? "თქვენი ანგარიში გაყინულია!"
            : "Your account is frozen!")}
      </div>
      <div className="mb-4">
        <PaymentElement className="bg-purple-800 p-3 rounded-md" />
      </div>
      <DualButton
        size="large"
        disabled={
          loading || stripe == null || elements == null || currentUser?.isFrozen
        }
      >
        {loading
          ? `${page.processing}...`
          : `${page.purchase} - ${formatCurrency(product.priceInCents / 100)}`}
      </DualButton>
    </form>
  );
}
