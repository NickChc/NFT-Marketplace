"use client";

import { LoadingIcon } from "@/assets/icons";
import { TLocale } from "../../../../../../../i18n.config";
import { CollectionCard } from "@/app/[lang]/(client)/profile/_components/Collection/CollectionCard";
import { useDictionary } from "@/hooks/useDictionary";
import { useUserCollection } from "@/hooks/useUserCollection";
import { useAuthProvider } from "@/providers/AuthProvider";

interface CollectionProps {
  lang: TLocale;
}

export function Collection({ lang }: CollectionProps) {
  const { collection, collectionLoading } = useUserCollection();
  const { currentUser } = useAuthProvider();
  const translations = useDictionary();

  const encodedEmail = encodeURIComponent(currentUser?.email || "");

  return (
    <>
      <hr className="my-4 w-full" />
      {collectionLoading ? (
        <LoadingIcon className="text-6xl animate-spin mx-auto sm:mt-9 mt-3" />
      ) : (
        <>
          <h2 className="text-lg sm:text-2xl font-semibold text-center">
            {collection.length > 0
              ? translations.page.myCollection
              : translations.page.noCollection}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4 pb-9">
            {collection.map((item) => {
              return (
                <CollectionCard
                  key={item.id}
                  product={item}
                  lang={lang}
                  encodedEmail={encodedEmail}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
