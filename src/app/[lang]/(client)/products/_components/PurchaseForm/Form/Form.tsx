"use client";

import { TProduct } from "@/@types/general";
import { auth } from "@/firebase";
import { formatCurrency } from "@/lib/formatters";
import { useAuthProvider } from "@/providers/AuthProvider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface FormProps {
  product: TProduct;
}

export function Form({ product }: FormProps) {
  const { currentUser } = useAuthProvider();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (product.owner?.userId === currentUser?.id) {
        return setErrorMessage("You already own this product");
      }

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
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
      <div>
        <PaymentElement />
      </div>
      <button
        disabled={loading || stripe == null || elements == null}
        className="bg-purple-800 rounded-sm p-2 hover:opacity-75 duration-100 disabled:cursor-default disabled:opacity-50 mt-6"
      >
        Purchase - {formatCurrency(product.priceInCents / 100)}
      </button>
    </form>
  );
}
