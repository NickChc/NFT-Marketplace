"use client";

import { TLocale } from "../../../../../i18n.config";
import { useEffect } from "react";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { ConfirmReturn } from "@/app/[lang]/(client)/profile/_components/ConfirmReturn";
import { SellForm } from "@/app/[lang]/(client)/profile/_components/SellForm";
import { ConfirmStopSelling } from "@/app/[lang]/(client)/profile/_components/ConfirmStopSelling";
import { UpdateUserForm } from "@/app/[lang]/(client)/profile/_components/UpdateUserForm";
import { ConfirmBiddingToggle } from "../../(client)/profile/_components/ConfirmBiddingToggle";

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
    bidItem,
    setBidItem,
  } = useGlobalProvider();

  const values = [
    returnItem,
    sellProduct,
    stopSellingProduct,
    updateUser,
    bidItem,
  ];

  function closeModal() {
    setReturnItem(null);
    setSellProduct(null);
    setStopSellingProduct(null);
    setUpdateUser(null);
    setBidItem(null);
  }

  useEffect(() => {
    const open = values.some((value) => value !== null);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [returnItem, sellProduct, stopSellingProduct, updateUser, bidItem]);

  if (!values.some((value) => value != null)) {
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
      <ConfirmBiddingToggle
        lang={lang}
        closeModal={closeModal}
        bidItem={bidItem}
      />
      <SellForm product={sellProduct} closeModal={closeModal} />
      <UpdateUserForm updateUser={updateUser} closeModal={closeModal} />
    </div>
  );
}
