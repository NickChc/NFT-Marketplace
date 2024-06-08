"use client";

import { TLocale } from "../../../../../i18n.config";
import { useEffect } from "react";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { ConfirmReturn } from "@/app/[lang]/(client)/profile/_components/ConfirmReturn";
import { SellForm } from "@/app/[lang]/(client)/profile/_components/SellForm";
import { ConfirmStopSelling } from "../../(client)/profile/_components/ConfirmStopSelling";

interface ModalProps {
  lang: TLocale;
}

export function Modal({ lang }: ModalProps) {
  const {
    returnItem,
    setReturnItem,
    sellProduct,
    setSellProduct,
    stopSellingProduct,
    setStopSellingProduct,
  } = useGlobalProvider();

  function closeModal() {
    setReturnItem(null);
    setSellProduct(null);
    setStopSellingProduct(null);
  }

  useEffect(() => {
    const open = returnItem != null;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [returnItem]);

  if (returnItem == null && sellProduct == null && stopSellingProduct == null) {
    return null;
  }

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
      <ConfirmStopSelling
        lang={lang}
        stopSellingProduct={stopSellingProduct}
        closeModal={closeModal}
      />
      <SellForm product={sellProduct} closeModal={closeModal} />
    </div>
  );
}
