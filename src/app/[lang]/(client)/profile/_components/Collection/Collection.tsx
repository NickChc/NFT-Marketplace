"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { CollectionCard } from "@/app/[lang]/(client)/profile/_components/Collection/CollectionCard";
import { useDictionary } from "@/hooks/useDictionary";
import { useUserCollection } from "@/hooks/useUserCollection";
import { useAuthProvider } from "@/providers/AuthProvider";

interface CollectionProps {
  lang: TLocale;
}

export function Collection({ lang }: CollectionProps) {
  const { collection } = useUserCollection();
  const { currentUser } = useAuthProvider();
  const translations = useDictionary();

  const encodedEmail = encodeURIComponent(currentUser?.email || "");

  return (
    <>
      <hr className="my-4 w-full" />
      <h1 className="text-lg sm:text-2xl font-semibold text-center">
        {collection.length > 0
          ? translations.page.myCollection
          : translations.page.noCollection}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4">
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
  );
}
