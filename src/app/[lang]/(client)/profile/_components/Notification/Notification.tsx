"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useEffect, useState } from "react";
import { TNotification } from "@/@types/general";
import { CloseIcon } from "@/assets/icons";
import { db } from "@/firebase";
import { useUserNotifications } from "@/hooks/useUserNotifications";
import { useAuthProvider } from "@/providers/AuthProvider";
import { deleteDoc, doc } from "firebase/firestore";

interface NotificationProps {
  lang: TLocale;
}

export function Notification({ lang }: NotificationProps) {
  const { currentUser } = useAuthProvider();
  const { notifications, getUserNotes } = useUserNotifications();
  const [filteredNotes, setFilteredNotes] = useState<TNotification[]>([]);
  const [show, setShow] = useState(false);

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

      if (promises.length < 1) return;

      await Promise.all(promises);
      getUserNotes(true);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const congratsOn =
    filteredNotes.length === 1
      ? filteredNotes[0].offer.productName
      : filteredNotes.map((n, index) => {
          if (filteredNotes[filteredNotes.length - 1] === n) {
            return `${n.offer.productName}`;
          }
          return `${n.offer.productName}, `;
        });

  useEffect(() => {
    if (currentUser == null) return;
    if (currentUser == null || notifications.length < 1) return;
    const filteredNotifications = notifications.filter(
      (note) => note.subject === "offer_accepted"
    );

    if (filteredNotifications.length < 1) return;
    setShow(true);
    setFilteredNotes(filteredNotifications);
    dismissNotifications();
  }, [currentUser, notifications]);

  if (currentUser == null || filteredNotes.length < 1 || !show) {
    return null;
  }

  return (
    <div className="rounded-lg bg-green-600 relative p-4 md:px-9 w-[90%] md:w-full mx-auto mt-6 text-sm sm:text-lg text-center">
      <span
        className="absolute top-1 right-1 cursor-pointer text-xl rounded-full"
        onClick={() => setShow(false)}
      >
        <CloseIcon />
      </span>
      {lang === "ka" ? (
        <>
          გილოცავთ! თქვენი შემოთავაზება {congratsOn} -თან დაკავშირებით მიიღეს.{" "}
          <br /> თქვენ ახლა ხართ ამ NFT -ს მფლობელი.
        </>
      ) : (
        <>
          Congratulations! Your offer for {congratsOn} got accepted. {<br />}
          Now you are owner of these NFT's.
        </>
      )}
    </div>
  );
}
