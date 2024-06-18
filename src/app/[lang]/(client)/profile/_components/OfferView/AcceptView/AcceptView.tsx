"use client";

import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";

interface AcceptViewProps {
  offeredInCents: number;
  onCancel: () => void;
}

export function AcceptView({ offeredInCents, onCancel }: AcceptViewProps) {
  const translations = useDictionary();
  return (
    <div>
      <div>
        Are you sure you want to accept this offer for{" "}
        {formatCurrency(offeredInCents / 100)}?
      </div>
      <div className="flex justify-between gap-3 items-center mt-3">
        <DualButton>{translations.page.yes}</DualButton>
        <DualButton variation="secondary" onClick={onCancel}>
          {translations.page.no}
        </DualButton>
      </div>
    </div>
  );
}
