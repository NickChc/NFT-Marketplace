"use client";

import { TNotification } from "@/@types/general";
import { CloseIcon } from "@/assets/icons";
import { db, notificationsCollectionRef } from "@/firebase";
import { useUserNotifications } from "@/hooks/useUserNotifications";
import { useAuthProvider } from "@/providers/AuthProvider";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { TLocale } from "../../../../../../../i18n.config";

interface NotificationProps {
  lang: TLocale;
}

export function Notification({ lang }: NotificationProps) {
  const { currentUser } = useAuthProvider();
  const [acceptedOfferNotes, setAcceptedOfferNotes] = useState<TNotification[]>(
    []
  );
  const { notifications, getUserNotes } = useUserNotifications();

  const showRef = useRef(false);

  async function dismissNotifications() {
    try {
      if (currentUser == null) return;
      const toDismiss = notifications.filter(
        (note) => note.subject === "offer_accepted"
      );
      const promises = toDismiss.map((note) => {
        const noteRef = doc(db, "notifications", note.id);
        return deleteDoc(noteRef);
      });

      await Promise.all(promises);
      getUserNotes(true);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const congratsOn =
    acceptedOfferNotes.length === 1
      ? `${acceptedOfferNotes[0].offer.productName}`
      : acceptedOfferNotes.map((n) => `${n.offer.productName},`);

  useEffect(() => {
    if (currentUser == null || notifications.length < 1) return;
    setAcceptedOfferNotes(
      notifications.filter((note) => note.subject === "offer_accepted")
    );
    dismissNotifications();
  }, [currentUser]);

  const filteredNotes = notifications.filter(
    (note) => note.subject === "offer_accepted"
  );

  if (currentUser == null || (filteredNotes.length < 1 && !showRef.current)) {
    return null;
  }

  return (
    <div className="rounded-lg bg-green-600 relative p-4 w-full mt-6 text-lg text-center">
      <span
        className="absolute top-1 right-1 cursor-pointer text-xl rounded-full"
        onClick={() => (showRef.current = false)}
      >
        <CloseIcon />
      </span>
      {lang === "ka"
        ? `გილოცავთ! თქვენი შემოთავაზება ${congratsOn} -სთან დაკავშირებით მიიღეს. ${(
            <br />
          )} თქვენ ახლა ხართ ამ NFT -ს მფლობელი.`
        : `Congratulations! Your offer for ${congratsOn} got accepted. ${(
            <br />
          )} Now you are owner of these NFT's.`}
    </div>
  );
}
