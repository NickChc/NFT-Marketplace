"use client";

import { TLocale } from "../../../../../i18n.config";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { ConfirmReturn } from "@/app/[lang]/(client)/profile/_components/ConfirmReturn";
import { useEffect } from "react";

interface ModalProps {
  lang: TLocale;
}

export function Modal({ lang }: ModalProps) {
  const { returnItem, setReturnItem } = useGlobalProvider();

  function closeModal() {
    setReturnItem(null);
  }

  useEffect(() => {
    const open = returnItem != null;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [returnItem]);

  if (returnItem == null) return null;

  return (
    <div
      className="absolute top-0 right-0 left-0 bottom-0 grid place-items-center backdrop-blur-sm z-50"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <ConfirmReturn
        closeModal={closeModal}
        returnItem={returnItem}
        lang={lang}
      />
    </div>
  );
}
