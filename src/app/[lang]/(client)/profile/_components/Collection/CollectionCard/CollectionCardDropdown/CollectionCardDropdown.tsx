"use client";

import { RightArrowIcon } from "@/assets/icons";
import { useDictionary } from "@/hooks/useDictionary";
import { useEffect, useState } from "react";
import { TProduct } from "@/@types/general";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { useAuthProvider } from "@/providers/AuthProvider";

interface CollectionCardDropdownProps {
  product: TProduct;
}

export function CollectionCardDropdown({
  product,
}: CollectionCardDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const translations = useDictionary();
  const { setReturnItem, setSellProduct, setStopSellingProduct, setBidItem } =
    useGlobalProvider();
  const { currentUser } = useAuthProvider();

  function handleSellButton() {
    if (product.isAvailable) {
      setStopSellingProduct(product);
    } else {
      setSellProduct(product);
    }
  }

  function closePopup() {
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("click", closePopup);

      return () => {
        document.removeEventListener("click", closePopup);
      };
    }
  }, [open]);

  return (
    <div className="relative mb-3">
      <span
        className={`flex items-center group duration-200 ${
          open ? "gap-6 mr-3 cursor-default" : "gap-3 mr-6 cursor-pointer"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {translations.page.more}
        <RightArrowIcon />
      </span>
      {open && (
        <div className="absolute bottom-6 right-9 sm:-right-9 p-1 flex flex-col items-start z-50 bg-white border-solid border border-purple-800 rounded-md">
          <button
            disabled={currentUser?.isFrozen}
            className="w-full cursor-pointer disabled:opacity-50 disabled:hover:bg-white disabled:cursor-default text-left p-1 hover:bg-purple-300 rounded-t-md dark:text-black whitespace-nowrap"
            onClick={handleSellButton}
          >
            {product.isAvailable
              ? translations.page.stopSelling
              : translations.page.sell}
          </button>
          <button
            disabled={currentUser?.isFrozen}
            className="whitespace-nowrap w-full cursor-pointer disabled:opacity-50 disabled:hover:bg-white disabled:cursor-default text-left p-1 hover:bg-purple-300 dark:text-black"
            onClick={() => setBidItem(product)}
          >
            {product.openForBidding
              ? translations.page.removeFromBidding
              : translations.page.setForBidding}
          </button>
          <button
            disabled={currentUser?.isFrozen}
            className="w-full cursor-pointer disabled:opacity-50 disabled:hover:bg-white disabled:cursor-default text-left p-1 hover:bg-red-300 hover:text-red-700 dark:hover:text-red-700 dark:text-black rounded-b-md"
            onClick={() => setReturnItem(product)}
          >
            {translations.page.return}
          </button>
        </div>
      )}
    </div>
  );
}
