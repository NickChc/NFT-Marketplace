"use client";

import { TProduct } from "@/@types/general";
import { DotsIcon } from "@/assets/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toggleAvailability } from "../../../_actions/products";

interface DropdownMenuProps {
  product: TProduct;
}

export function DropdownMenu({ product }: DropdownMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  async function toggleAvailable() {
    await toggleAvailability(product, !product.isAvailable);
    router.refresh();
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
    <div className="relative">
      <button onClick={() => setOpen((prev) => !prev)} className="p-2">
        <DotsIcon />
      </button>
      {open && (
        <div className="absolute top-4 right-6 p-1 flex flex-col items-start z-50 bg-white rounded-md">
          <button
            className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 rounded-t-md"
            onClick={toggleAvailable}
          >
            {product.isAvailable ? "Deactivate" : "Activate"}
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300">
            Edit
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default bg-red-300 text-left p-1 hover:text-red-800 rounded-b-md">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
