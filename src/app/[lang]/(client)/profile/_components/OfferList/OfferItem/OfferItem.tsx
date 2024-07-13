"use client";

import { TOffer } from "@/@types/general";
import { FilledCircleIcon } from "@/assets/icons";
import { db } from "@/firebase";
import { useDictionary } from "@/hooks/useDictionary";
import { useUserNotifications } from "@/hooks/useUserNotifications";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface OfferItemProps {
  offer: TOffer;
}

export function OfferItem({ offer }: OfferItemProps) {
  const [show, setShow] = useState(false);
  const translations = useDictionary();
  const { setOfferToView } = useGlobalProvider();
  const { notifications } = useUserNotifications();

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <li
      className={`flex flex-col items-stretch sm:items-center sm:flex-row gap-3 justify-between p-3 relative transition-all duration-500 ${
        show ? "scale-y-100" : "scale-y-0"
      } `}
    >
      {notifications.some((note) => note.offer.id === offer.id) && (
        <>
          <FilledCircleIcon className="text-green-500 text-2xl rounded-full hidden sm:block absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-20 md:-left-9" />
          <span className="absolute right-1/2 translate-x-1/2 -bottom-3 text-sm text-green-500 block sm:hidden">
            New!
          </span>
        </>
      )}
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
