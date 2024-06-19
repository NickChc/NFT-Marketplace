import { TNotification } from "@/@types/general";
import { notificationsCollectionRef } from "@/firebase";
import { getDocs, query, where } from "firebase/firestore";

export async function getNotifications(userId: string) {
  try {
    const data = await getDocs(
      query(notificationsCollectionRef, where("userId", "==", userId))
    );
    const notifications = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return notifications as TNotification[];
  } catch (error: any) {
    console.log(error.message);
  }
}
