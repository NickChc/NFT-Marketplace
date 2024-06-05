"use client";

import { useUserCollection } from "@/hooks/useUserCollection";
import Image from "next/image";

export function Collection() {
  const { collection } = useUserCollection();

  return (
    <div>
      {collection.map((item) => {
        return (
          <div key={item.id} className="flex flex-col p-3">
            <div className="min-w-20 aspect-video relative">
              <Image src={item.imagePath} fill alt={`Image of ${item.name}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
