"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { OfferItem } from "./OfferItem";

export function OfferList() {
  const { currentUser } = useAuthProvider();

  if (currentUser == null || currentUser?.offers.length < 1) return null;

  return (
    <>
      <h2 className="text-lg sm:text-2xl font-semibold text-center mt-4">
        My Offers
      </h2>
      <hr className="w-full my-3" />
      <ul className="list-none flex flex-col">
        {currentUser.offers.map((offer) => {
          return <OfferItem key={offer.id} offer={offer} />;
        })}
      </ul>
    </>
  );
}
