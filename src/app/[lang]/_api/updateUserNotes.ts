import { TNotification, TUser } from "@/@types/general";
import { db, notificationsCollectionRef } from "@/firebase";
import { doc, getDocs, query, where, writeBatch } from "firebase/firestore";

export async function updateUserNotes(
  user: TUser | null,
  offerProductId: string,
  newNote?: Omit<TNotification, "id">
) {
  try {
    if (user == null) return;

    const q = query(
      notificationsCollectionRef,
      where("userId", "==", user.id),
      where("offer.productId", "==", offerProductId),
      where("subject", "==", "offer_received")
    );
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    if (newNote != null) {
      const newNoteRef = doc(notificationsCollectionRef);
      batch.set(newNoteRef, newNote);
    }

    await batch.commit();
  } catch (error: any) {
    console.log(error.message);
  }
}
