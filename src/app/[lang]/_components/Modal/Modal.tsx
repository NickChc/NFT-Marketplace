"use client";

import { TLocale } from "../../../../../i18n.config";
import { useEffect } from "react";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { ConfirmReturn } from "@/app/[lang]/(client)/profile/_components/ConfirmReturn";
import { SellForm } from "@/app/[lang]/(client)/profile/_components/SellForm";
import { ConfirmStopSelling } from "@/app/[lang]/(client)/profile/_components/ConfirmStopSelling";
import { UpdateUserForm } from "@/app/[lang]/(client)/profile/_components/UpdateUserForm";

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
    updateUser,
    setUpdateUser,
  } = useGlobalProvider();

  function closeModal() {
    setReturnItem(null);
    setSellProduct(null);
    setStopSellingProduct(null);
    setUpdateUser(null);
  }

  useEffect(() => {
    const values = [returnItem, sellProduct, stopSellingProduct, updateUser];
    const open = values.some((value) => value !== null);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [returnItem, sellProduct, stopSellingProduct, updateUser]);

  if (
    returnItem == null &&
    sellProduct == null &&
    stopSellingProduct == null &&
    updateUser == null
  ) {
    return null;
  }

  return (
    <div
      className="fixed min-h-dvh top-0 bottom-0 right-0 left-0 grid place-items-center backdrop-blur-sm z-50"
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
      <UpdateUserForm updateUser={updateUser} closeModal={closeModal} />
    </div>
  );
}
