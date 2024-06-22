"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useFormStatus } from "react-dom";
import { DualButton } from "../../../DualButton";

interface OfferSubmitButtonProps {
  price: number;
  error?: string;
}

export function OfferSubmitButton({ error, price }: OfferSubmitButtonProps) {
  const { pending } = useFormStatus();
  const translations = useDictionary();

  return (
    <DualButton disabled={pending || error != null} type="submit">
      {pending
        ? `${translations.page.processing}...`
        : `${translations.page.offer} ${formatCurrency(Number(price) || 0)}`}
    </DualButton>
  );
}
