"use client";

import { auth } from "@/firebase";
import { formatCurrency } from "@/lib/formatters";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface FormProps {
  priceInCents: number;
  productId: string;
}

export function Form({ priceInCents }: FormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      setLoading(true);

      if (auth.currentUser == null || stripe == null || elements == null)
        return;

      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/en/stripe/purchase-success`,
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
            setErrorMessage(error.message);
          } else {
            setErrorMessage("Some Problem Occured");
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
        <h2>Checkout</h2>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
      <div>
        <PaymentElement />
      </div>
      <button
        disabled={loading || stripe == null || elements == null}
        className="bg-purple-800 rounded-sm p-2 hover:opacity-75 duration-100 disabled:cursor-default disabled:opacity-50 mt-6"
      >
        Purchase - {formatCurrency(priceInCents / 100)}
      </button>
    </form>
  );
}
