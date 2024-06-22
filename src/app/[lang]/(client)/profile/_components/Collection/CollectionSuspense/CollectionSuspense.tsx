"use client";

import { TLocale } from "../../../../../../../../i18n.config";
import { useUserCollection } from "@/hooks/useUserCollection";
import { CollectionCard } from "@/app/[lang]/(client)/profile/_components/Collection/CollectionCard";
import { TProduct } from "@/@types/general";

interface CollectionSuspenseProps {
  lang: TLocale;
  encodedEmail: string;
  collection: TProduct[];
}

export function CollectionSuspense({
  lang,
  encodedEmail,
  collection,
}: CollectionSuspenseProps) {

  return collection.map((item) => {
    return (
      <CollectionCard
        key={item.id}
        product={item}
        lang={lang}
        encodedEmail={encodedEmail}
      />
    );
  });
}
