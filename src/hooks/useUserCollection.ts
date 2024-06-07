import { TProduct } from "@/@types/general";
import { getProducts } from "@/app/[lang]/_api/getProducts";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { useCallback, useEffect, useState } from "react";

export function useUserCollection() {
  const [loading, setLoading] = useState<boolean>(false);
  const { setCollection, collection } = useGlobalProvider();
  const { currentUser } = useAuthProvider();

  const getUserCollection = useCallback(async () => {
    try {
      setLoading(true);
      if (currentUser == null) return;
      const ownings = await getProducts(
        undefined,
        undefined,
        undefined,
        currentUser.id
      );
      setCollection(ownings || []);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    getUserCollection();
  }, [currentUser, getUserCollection]);

  return {
    collection,
    collectionLoading: loading,
    getUserCollection,
    setCollection,
  };
}
