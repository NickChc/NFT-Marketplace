"use client";

import { TOffer } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import { useGlobalProvider } from "@/providers/GlobalProvider";

interface OfferItemProps {
  offer: TOffer;
}

export function OfferItem({ offer }: OfferItemProps) {
  const { setOfferToView } = useGlobalProvider();
  return (
    <li className="flex flex-col items-stretch sm:items-center sm:flex-row gap-3 justify-between p-3">
      <div className="max-w-full truncate">
        {offer.from} Offers {formatCurrency(offer.offeredInCents / 100)}
      </div>
      <button
        className="bg-purple-800 rounded-md px-2 py-1 hover:opacity-75 duration-100"
        onClick={() => setOfferToView(offer)}
      >
        View Offer
      </button>
    </li>
  );
}
