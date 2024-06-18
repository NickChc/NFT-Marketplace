"use client";

import { TNotification } from "@/@types/general";
import { CloseIcon } from "@/assets/icons";
import { db } from "@/firebase";
import { useAuthProvider } from "@/providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export function Notification() {
  const { currentUser, getCurrentUser } = useAuthProvider();
  const [acceptedOfferNotes, setAcceptedOfferNotes] = useState<TNotification[]>(
    []
  );

  const showRef = useRef(false);

  async function dismissNotifications() {
    try {
      if (currentUser == null) return;
        const userDoc = doc(db, "users", currentUser.id);
        await updateDoc(userDoc, {
          notifications: currentUser.notifications.filter(
            (note) => note.subject !== "offer_accepted"
          ),
        });
      getCurrentUser(undefined, currentUser.uid);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (currentUser == null || currentUser.notifications.length < 1) return;
    showRef.current = true;
    setAcceptedOfferNotes(
      currentUser.notifications.filter(
        (note) => note.subject === "offer_accepted"
      )
    );
    dismissNotifications();
  }, [currentUser]);

  if (currentUser == null || !showRef.current) {
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
      Congratulations! Your offer for{" "}
      {acceptedOfferNotes.length === 1
        ? `${acceptedOfferNotes[0].acceptedOffer.productName}`
        : acceptedOfferNotes.map((n) => `${n.acceptedOffer.productName},`)}{" "}
      got accepted. <br /> You are now owner of these NFT's.
    </div>
  );
}
