"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useFormStatus } from "react-dom";

interface OfferSubmitButtonProps {
  price: number;
  error?: string;
}

export function OfferSubmitButton({ error, price }: OfferSubmitButtonProps) {
  const { pending } = useFormStatus();
  const translations = useDictionary();

  return (
    <button
      disabled={pending || error != null}
      className="bg-purple-800 px-2 py-1 w-full rounded-sm text-white hover:opacity-75 disabled:cursor-default disabled:opacity-75"
      type="submit"
    >
      {pending
        ? `${translations.page.processing}...`
        : `${translations.page.offer} ${formatCurrency(Number(price) || 0)}`}
    </button>
  );
}
