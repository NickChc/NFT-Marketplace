"use client";

import { TLocale } from "../../../../../i18n.config";
import { useEffect } from "react";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { ConfirmReturn } from "@/app/[lang]/(client)/profile/_components/ConfirmReturn";
import { SellForm } from "@/app/[lang]/(client)/profile/_components/SellForm";
import { ConfirmStopSelling } from "@/app/[lang]/(client)/profile/_components/ConfirmStopSelling";
import { UpdateUserForm } from "@/app/[lang]/(client)/profile/_components/UpdateUserForm";
import { ConfirmBiddingToggle } from "@/app/[lang]/(client)/profile/_components/ConfirmBiddingToggle";
import { ConfirmDeleteAcc } from "@/app/[lang]/(client)/profile/_components/ConfirmDeleteAcc";
import { OfferForm } from "@/app/[lang]/_components/Modal/OfferForm";
import { OfferView } from "@/app/[lang]/(client)/profile/_components/OfferView";

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
    deleteUser,
    setDeleteUser,
    offerItem,
    setOfferItem,
    offerToView,
    setOfferToView,
  } = useGlobalProvider();

  function closeModal() {
    setReturnItem(null);
    setSellProduct(null);
    setStopSellingProduct(null);
    setUpdateUser(null);
    setBidItem(null);
    setDeleteUser(null);
    setOfferItem(null);
    setOfferToView(null);
  }

  const dependencies = [
    returnItem,
    sellProduct,
    stopSellingProduct,
    updateUser,
    bidItem,
    deleteUser,
    offerItem,
    offerToView,
  ];

  useEffect(() => {
    const open = dependencies.some((dep) => dep !== null);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [...dependencies]);

  if (!dependencies.some((dep) => dep != null)) {
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
      <OfferForm closeModal={closeModal} offerItem={offerItem} />
      <ConfirmDeleteAcc
        lang={lang}
        closeModal={closeModal}
        deleteUser={deleteUser}
      />
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
      <UpdateUserForm
        lang={lang}
        updateUser={updateUser}
        closeModal={closeModal}
      />
      <OfferView offer={offerToView} lang={lang} closeModal={closeModal} />
    </div>
  );
}
