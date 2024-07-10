"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { useDictionary } from "@/hooks/useDictionary";
import { useUserCollection } from "@/hooks/useUserCollection";
import { useAuthProvider } from "@/providers/AuthProvider";
import { Suspense, useEffect, useState } from "react";
import { ProductSkeleton } from "@/app/[lang]/(client)/_component/ProductSkeleton";
import { CollectionSuspense } from "@/app/[lang]/(client)/profile/_components/Collection/CollectionSuspense";

interface CollectionProps {
  lang: TLocale;
}

export function Collection({ lang }: CollectionProps) {
  const [mounted, setMounted] = useState(false);
  const { collection, collectionLoading } = useUserCollection(mounted);
  const { currentUser } = useAuthProvider();
  const translations = useDictionary();

  const encodedEmail = encodeURIComponent(currentUser?.email || "");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <hr className="my-4 w-full border-black dark:border-white" />
      <h2 className="text-lg sm:text-2xl font-semibold text-center">
        {!collectionLoading &&
          (collection.length > 0
            ? translations.page.myCollection
            : translations.page.noCollection)}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4 pb-9">
        <Suspense
          fallback={
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          }
        >
          {!collectionLoading ? (
            <CollectionSuspense
              encodedEmail={encodedEmail}
              lang={lang}
              collection={collection}
            />
          ) : (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          )}
        </Suspense>
      </div>
    </>
  );
}
