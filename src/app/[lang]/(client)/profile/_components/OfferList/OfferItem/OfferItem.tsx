"use client";

import { TOffer } from "@/@types/general";
import { useDictionary } from "@/hooks/useDictionary";
import { formatCurrency } from "@/lib/formatters";
import { useGlobalProvider } from "@/providers/GlobalProvider";

interface OfferItemProps {
  offer: TOffer;
}

export function OfferItem({ offer }: OfferItemProps) {
  const translations = useDictionary();
  const { setOfferToView } = useGlobalProvider();

  return (
    <li className="flex flex-col items-stretch sm:items-center sm:flex-row gap-3 justify-between p-3">
      <div className="max-w-full truncate flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <h5 className="opacity-80 max-w-full truncate">{offer.from}</h5>{" "}
        {translations.page.sentAnOffer}
      </div>
      <button
        className="bg-purple-800 rounded-md px-2 py-1 hover:opacity-75 text-white duration-100"
        onClick={() => setOfferToView(offer)}
      >
        {translations.page.viewOffer}
      </button>
    </li>
  );
}
