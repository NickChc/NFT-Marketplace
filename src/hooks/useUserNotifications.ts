import { getNotifications } from "@/app/[lang]/_api/getNotifications";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { useEffect, useState } from "react";

export function useUserNotifications() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthProvider();
  const { setNotifications, notifications } = useGlobalProvider();

  async function getUserNotes(noLoading?: boolean) {
    try {
      if (currentUser == null) return;
      if (!noLoading) {
        setLoading(true);
      }
      const notes = await getNotifications(currentUser.id);
      if (notes == null) return;
      setNotifications(notes);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserNotes();
  }, [currentUser]);

  return { notifications, notesLoading: loading, getUserNotes };
}
