"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { OfferItem } from "@/app/[lang]/(client)/profile/_components/OfferList/OfferItem";
import { useState } from "react";
import { RightArrowIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";


export function OfferList() {
  const translations = useDictionary();
  const [loadFull, setLoadFull] = useState<boolean>(false);
  const { currentUser } = useAuthProvider();

  if (currentUser == null || currentUser?.offers.length < 1) return null;

  return (
    <>
      <h2 className="text-lg sm:text-2xl font-semibold text-center mt-4">
        {translations.page.myOffers}
      </h2>
      <hr className="w-full my-3" />
      <ul
        className={`list-none flex flex-col max-h-fit h-fit md:pl-9 ${
          loadFull ? "max-h-40 overflow-y-auto" : ""
        }`}
      >
        {loadFull
          ? currentUser.offers.map((offer) => {
              return <OfferItem key={offer.id} offer={offer} />;
            })
          : currentUser.offers
              .reverse()
              .slice(0, 3)
              .map((offer) => {
                return <OfferItem key={offer.id} offer={offer} />;
              })}
      </ul>
      {currentUser.offers.length > 3 && (
        <span
          className="float-end cursor-pointer flex items-center gap-3 m-3"
          onClick={() => setLoadFull((prev) => !prev)}
        >
          {loadFull
            ? `${translations.page.hide}`
            : `${translations.page.seeAll}`}{" "}
          <RightArrowIcon
            className={`duration-300 ${loadFull ? "-rotate-90" : "rotate-90"}`}
          />
        </span>
      )}
    </>
  );
}
